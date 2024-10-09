cmd /c em++ ^
    -O2 ^
    -I src\ ^
    src\gui\Button.cpp ^
    src\gui\Child.cpp ^
    src\gui\Color.cpp ^
    src\gui\Component.cpp ^
    src\gui\ComponentFactory.cpp ^
    src\gui\ComponentLoader.cpp ^
    src\gui\Desktop.cpp ^
    src\gui\Document.cpp ^
    src\gui\DocumentImage.cpp ^
    src\gui\Event.cpp ^
    src\gui\FilledRectangle.cpp ^
    src\gui\Filter.cpp ^
    src\gui\FontManager.cpp ^
    src\gui\Gradient.cpp ^
    src\gui\Image.cpp ^
    src\gui\Panel.cpp ^
    src\gui\Paragraph.cpp ^
    src\gui\Rect2D.cpp ^
    src\gui\ScrollBar.cpp ^
    src\gui\ScrollView.cpp ^
    src\gui\Style.cpp ^
    src\gui\SwitchComponent.cpp ^
    src\gui\TableLayout.cpp ^
    src\gui\TextureManager.cpp ^
    src\gui\TooltipManager.cpp ^
    src\gui\Vector2.cpp ^
    src\gui\Window.cpp ^
    src\gui\WindowManager.cpp ^
    src\gui\XmlReader.cpp ^
    src\gui\PainterSDL\PainterSDL.cpp ^
    src\gui\PainterSDL\TextureSDL.cpp ^
    src\gui\PainterSDL\TextureManagerSDL.cpp ^
    -sUSE_SDL=2 ^
    -c

cmd /c emar rcs bin/gui.a *.o

del /Q *.o