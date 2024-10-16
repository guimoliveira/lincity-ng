#include "Sound.hpp"

#include <SDL.h>
#include <SDL_mixer.h>
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <cmath>
#include <iostream>
#include <utility>
#include <vector>

#include "Config.hpp"
#include "Game.hpp"
#include "gui/XmlReader.hpp"
#include "lincity/engglobs.h"
#include "lincity/lin-city.h"
#include "lincity/resources.hpp"

#ifdef DEBUG
#include <stdexcept>
#endif

Sound *soundPtr = 0;

Sound *getSound()
{
    return soundPtr;
}

void Sound::loadWaves()
{
    // Load Waves
    std::string directory = "/data/sounds/";
    std::string xmlfile = directory + "sounds.xml";

    XmlReader reader(xmlfile);
    std::string fullname;

    std::vector<ResourceGroup *> resGrpVec;
    resGrpVec.clear();

    int resourceID_level = 0;
    std::string key;
    Mix_Chunk *chunk;

    while (reader.read())
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            const std::string &element = reader.getName();

            if (element == "resourceID")
            {
                XmlReader::AttributeIterator iter(reader);
                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();
                    if (name == "name")
                    {
                        if (ResourceGroup::resMap.count(value))
                        {
                            resGrpVec.push_back(ResourceGroup::resMap[value]);
                            resourceID_level = reader.getDepth();
                            if (resGrpVec.back()->sounds_loaded) // could crash if game is already running
                            {
                                std::cout << "Warning duplicate resourceID in sounds.xml: " << value << std::endl;
                            }
                        }
                        else
                        {
                            std::cout << "unknown resourceID: " << value << " in sounds.xml" << std::endl;
                        }
                    }
                }
            }
            if (reader.getDepth() < resourceID_level)
            {
                for (size_t i = 0; i < resGrpVec.size(); ++i)
                {
                    resGrpVec[i]->sounds_loaded = true;
                }
                resGrpVec.clear();
                resourceID_level = 0;
            }
            if (element == "sound")
            {
                XmlReader::AttributeIterator iter(reader);
                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();
                    if (name == "file")
                    {
                        key = value;
                    }
                    else
                    {
                        std::cout << "unknown attribute " << name << " in sounds.xml" << std::endl;
                    }
                }
                fullname = directory + key;
                chunk = Mix_LoadWAV(fullname.c_str());
                if (!chunk)
                {
                    std::cerr << "warning: failed to load sound '" << key
                              << "': " << Mix_GetError() << std::endl;
                }
                if (resourceID_level && resGrpVec.size())
                {
                    for (size_t i = 0; i < resGrpVec.size(); ++i)
                    {
                        resGrpVec[i]->chunks.push_back(chunk);
                    }
                }
                else
                {
                    std::string idName = getIdName(key);
                    waves.insert(std::pair<std::string, Mix_Chunk *>(idName, chunk));
                }
                key.clear();
            }
        }
    } // end xml reader
    if (resGrpVec.size())
    {
        for (size_t i = 0; i < resGrpVec.size(); ++i)
        {
            resGrpVec[i]->sounds_loaded = true;
        }
        resGrpVec.clear();
    }
}

/*
 * Load music theme from subfolder of 'music/'.
 * If no theme files are present, load just plain playlist.
 */
void Sound::loadMusicTheme()
{
    std::string musicDir = "/data/music/";
    // Reset track counter:
    totalTracks = 0;
    playlist.clear();
    // Get the current music theme
    std::string theme = getConfig()->musicTheme;

    std::string xml_name = musicDir + theme + "/" + theme + ".xml";

    // Get the number of songs
    XmlReader reader(xml_name);

    while (reader.read())
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            const std::string &element = reader.getName();

            if (element == "song")
            {
                XmlReader::AttributeIterator iter(reader);
                std::string title;
                std::string filename;
                float lowest_tech_level = 0.0;
                float highest_tech_level = 10000.0;

                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();

                    if (name == "title")
                        title = value;
                    else if (name == "filename")
                    {
                        filename = theme + "/" + value;
                    }
                    else if (name == "highest-tech-level")
                        highest_tech_level = strtod(value.c_str(), NULL);
                    else if (name == "lowest-tech-level")
                        lowest_tech_level = strtod(value.c_str(), NULL);
                }
                song tempSong;
                tempSong.title = title;
                tempSong.filename = filename;
                tempSong.trackNumber = totalTracks;
                tempSong.lowestTechLevel = lowest_tech_level;
                if (highest_tech_level == 0)
                {
                    highest_tech_level = 10 * MAX_TECH_LEVEL;
                }
                tempSong.highestTechLevel = highest_tech_level;

                playlist.push_back(tempSong);
                std::cerr << "Found song: '" << playlist[totalTracks].title << "'" << std::endl;
                totalTracks++;
            }
            else
            {
                std::cerr << "Config::load# Unknown element '" << element << "' in " << theme << "." << std::endl;
            }
        }
    }
}

Sound::Sound()
    : currentMusic(0)
{
    assert(soundPtr == 0);
    soundPtr = this;

    // Load Sound
    audioOpen = false;
    /* Open the audio device */
    if (Mix_OpenAudio(MIX_DEFAULT_FREQUENCY, MIX_DEFAULT_FORMAT, 2, 4096) < 0)
    {
        fprintf(stderr, "Couldn't open audio: %s\n", SDL_GetError());
        return;
    }
    else
    {
        audioOpen = true;
        loadWaves();
    }

    setMusicVolume(getConfig()->musicVolume);
    setSoundVolume(getConfig()->soundVolume);

    totalTracks = 0;
    loadMusicTheme();

    //'totalTracks' gets too high value in while loop. Let's fix it.
    totalTracks = totalTracks - 1;

    // Load background music.
    // First check if there really is something in playlist to prevent crashing
    if (!playlist.empty())
    {
        currentTrack = playlist[0];
    }
    playMusic();
}

Sound::~Sound()
{
    if (currentMusic)
        Mix_FreeMusic(currentMusic);

    if (soundPtr == this)
    {
        soundPtr = 0;
    }
    for (chunks_t::iterator i = waves.begin(); i != waves.end(); i++)
    {
        Mix_FreeChunk(i->second);
    }
    if (audioOpen)
    {
        Mix_CloseAudio();
        audioOpen = false;
    }
}

/*
 *  Playback an Audio-Effect.
 *  Name is the Name of an Audiofile from sounds/ minus .wav
 *  and without trailing Numbers. If there are eg.
 *  beep1.wav, beep2.wav, beep3.wav
 *  playSound( "beep" ) would pick one of the three Files randomly
 */
void Sound::playSound(const std::string &name)
{
    if (!getConfig()->soundEnabled)
    {
        return;
    }
    if (!audioOpen)
    {
        return;
    }

    chunks_t::size_type count = waves.count(name);
    if (count == 0)
    {
        std::cout << "Couldn't find audio file '" << name << "'" << std::endl;
        return;
    }

    chunks_t::iterator it = waves.find(name);
    for (int i = rand() % count; i > 0; i--)
    {
        it++;
    }

    Mix_Volume(0, getConfig()->soundVolume);
    Mix_PlayChannel(0, it->second, 0);
}

void Sound::playASound(Mix_Chunk *chunk)
{
    if (!getConfig()->soundEnabled)
    {
        return;
    }
    if (!audioOpen)
    {
        return;
    }
    Mix_Volume(0, getConfig()->soundVolume);
    Mix_PlayChannel(0, chunk, 0);
}

/*
 * Get ID-String for a given Filename.
 */
std::string
Sound::getIdName(const std::string &filename)
{
    std::string::size_type pos = filename.find_first_of(".0123456789");

    return filename.substr(0, pos);
}

/*
 * Change backround music.
 * Possible variables can be found from Sound.hpp: enum musicTransport
 * Currently there are three of them: NEXT_TRACK, NEXT_OR_FIRST_TRACK, PREV_TRACK
 * Sould be self-explanatory.
 */
void Sound::changeTrack(MusicTransport command)
{

    // Something may gone wrong in the initialization:
    if (playlist.empty())
        return;

    switch (command)
    {
    case NEXT_TRACK:
        if (currentTrack.trackNumber + 1 <= totalTracks)
        {
            currentTrack = playlist[currentTrack.trackNumber + 1];
            playMusic();
        }
        break;

    case NEXT_OR_FIRST_TRACK:
        if (currentTrack.trackNumber + 1 <= totalTracks)
        {
            currentTrack = playlist[currentTrack.trackNumber + 1];
            playMusic();
        }
        else
        {
            // Jump to the beginning
            currentTrack = playlist[0];
            playMusic();
        }
        break;

    case PREV_TRACK:
        if (currentTrack.trackNumber > 0)
        {
            currentTrack = playlist[currentTrack.trackNumber - 1];
            playMusic();
        }
        else
        {
            // Jump to the beginning
            currentTrack = playlist[0];
            playMusic();
        }
        break;
    }
}

void Sound::playMusic()
{
    if (!audioOpen)
        return;

    if (getConfig()->musicEnabled)
    {

        if (currentMusic)
        {
            if (Mix_PlayingMusic())
            {
                Mix_FreeMusic(currentMusic);
            }
            currentMusic = 0;
        }

        // Check if current track is allowed at this tech level
        // This calculates the right tech_level and rounds it by one decimal.
        float current_tech = tech_level * (float)100 / MAX_TECH_LEVEL;
        current_tech = round(current_tech * 10) / 10;

        if (getGame() && (current_tech < currentTrack.lowestTechLevel || current_tech > currentTrack.highestTechLevel))
        {
            // std::cerr << "Next track is " << currentTrack.title
            //<< " and it's tech level prerequisites range from "
            //<< currentTrack.lowestTechLevel << " to " << currentTrack.highestTechLevel << "." << std::endl;
            // std::cerr << "Current tech level is " << current_tech << "." << std::endl;
            changeTrack(NEXT_OR_FIRST_TRACK);
            return;
        }

        std::string filename = "/data/music/" + currentTrack.filename;

        currentMusic = Mix_LoadMUS(filename.c_str());
        if (currentMusic == 0)
        {
            std::cerr << "Couldn't load music file '" << filename << "': "
                      << SDL_GetError() << std::endl;
            return;
        }

        Mix_PlayMusic(currentMusic, 1);
    }
}

void Sound::enableMusic(bool enabled)
{
    if (getConfig()->musicEnabled == enabled)
        return;
    getConfig()->musicEnabled = enabled;

    if (!audioOpen)
        return;

    if (enabled)
    {
        playMusic();
    }
    else
    {
        Mix_HaltMusic();
    }
}

void Sound::setMusicVolume(int vol)
{
#ifdef DEBUG
    if (vol < 0 || vol > 100)
    {
        throw std::runtime_error("Music volume out of range (0..100)");
    }
#endif
    getConfig()->musicVolume = vol;
    float volvalue = vol * MIX_MAX_VOLUME / 100.0;
    Mix_VolumeMusic(static_cast<int>(volvalue));
}

void Sound::setSoundVolume(int vol)
{
#ifdef DEBUG
    if (vol < 0 || vol > 100)
    {
        throw std::runtime_error("Sound volume out of range (0..100)");
    }
#endif
    getConfig()->soundVolume = vol;
    float volvalue = vol * MIX_MAX_VOLUME / 100.0;
    Mix_Volume(-1, static_cast<int>(volvalue));
}
