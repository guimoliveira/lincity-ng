#ifndef __XMLREADER_HPP__
#define __XMLREADER_HPP__

#define XML_READER_TYPE_ELEMENT                1
#define XML_READER_TYPE_ATTRIBUTE              2
#define XML_READER_TYPE_TEXT                   3
#define XML_READER_TYPE_CDATA                  4
#define XML_READER_TYPE_PI                     7
#define XML_READER_TYPE_COMMENT                8
#define XML_READER_TYPE_DOCUMENT               9
#define XML_READER_TYPE_DOCUMENT_TYPE          10
#define XML_READER_TYPE_END_ELEMENT            15
#define XML_READER_TYPE_END_ENTITY             16

#include <string>

class XmlReader
{
public:
    XmlReader(const std::string &filename);
    ~XmlReader();

    int getDepth();
    int getNodeType();

    std::string getName();
    std::string getValue();

    std::string readString()
    {
        return getValue();
    }

    bool hasValue();
    bool isEmptyElement();
    bool nextNode();
    bool read();

    class AttributeIterator
    {
    public:
        AttributeIterator(XmlReader &reader);
        ~AttributeIterator();

        bool next();

        std::string getName();
        std::string getValue();

    private:
        bool first;
        bool last;
        int reader;
    };

private:
    int reader;
};

#endif
