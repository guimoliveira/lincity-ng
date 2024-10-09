#include <emscripten.h>
#include <iostream>
#include <fstream>

#include "XmlReader.hpp"

/**
 * Class constructor: parses a given XML file
 *
 * @param filename XML file to parse.
 */
XmlReader::XmlReader(const std::string &filename)
{
    std::ifstream xml(filename);
    std::string line;
    std::string string;

    while (std::getline(xml, line)) {
        string += line + "\n";
    }

    reader = EM_ASM_INT({
        const parser = new DOMParser();
        const doc = parser.parseFromString(UTF8ToString($0), "text/xml");

        window.xmlDocs = window.xmlDocs || [];
        window.xmlDocs.push({doc: doc, currentNode: doc, currentAttribute: null, closing: false, depth: 0});

        return window.xmlDocs.length - 1;
        }, string.c_str());

    do
    {
        read();
    } while (getNodeType() != XML_READER_TYPE_ELEMENT);
}

/**
 * Class destructor: destroy the object created when parsing a XML file.
 */
XmlReader::~XmlReader()
{
    EM_ASM({
        window.xmlDocs[$0] = undefined;
        }, reader);
}

int XmlReader::getDepth()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        return doc.depth;
        }, reader);
}

int XmlReader::getNodeType()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        if (doc.closing) {
            if (doc.currentNode.nodeType == 1) {
                return 15;
            } else {
                return 16;
            }
        } else {
            return doc.currentNode.nodeType;
        }
        }, reader);
}

bool XmlReader::hasValue()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        return doc.currentNode.nodeValue != null;
        }, reader);
}

bool XmlReader::isEmptyElement()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        return !doc.currentNode.hasChildNodes();
        }, reader);
}

std::string XmlReader::getName()
{
    const char* value = (const char*)EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        const str = doc.currentNode.nodeName || "";
        const strLength = lengthBytesUTF8(str) + 1;
        const ptr = Module._malloc(strLength);
        stringToUTF8(str, ptr, strLength);

        return ptr;
        }, reader);
    return std::string(value);
}

std::string XmlReader::getValue()
{
    const char* value = (const char*)EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        const str = doc.currentNode.nodeValue || "";
        const strLength = lengthBytesUTF8(str) + 1;
        const ptr = Module._malloc(strLength);
        stringToUTF8(str, ptr, strLength);

        return ptr;
        }, reader);
    return std::string(value);
}

bool XmlReader::nextNode()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];

        const nextSibling = doc.currentNode.nextSibling;
        if (nextSibling == null) {
            return false;        
        } 
        doc.currentNode = nextSibling;
        doc.closing = false;
        return true;
        }, reader);
}

bool XmlReader::read()
{
    return EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        const currentNode = doc.currentNode;

        if (doc.closing) {
            if (currentNode.nextSibling != null) {
                doc.currentNode = currentNode.nextSibling;
                doc.closing = false;
            } else {
                if (currentNode.parentNode == null) {
                    return false;
                }
                doc.currentNode = currentNode.parentNode;
                doc.depth--;
            }
        } else if (doc.currentNode.hasChildNodes()) {
            doc.currentNode = doc.currentNode.firstChild;
            doc.depth++;
        } else {
            let nextSibling = doc.currentNode.nextSibling;
            if (nextSibling == null) {
                if (currentNode.parentNode == null) {
                    return false;
                } 
                doc.currentNode = currentNode.parentNode;
                doc.closing = true;
                doc.depth--;
            } else {
                doc.currentNode = nextSibling;
            }
        }
        return true;
        }, reader);
}

XmlReader::AttributeIterator::AttributeIterator(XmlReader& reader)
{
    this->reader = reader.reader;
    first = true;
    last = false;
}

XmlReader::AttributeIterator::~AttributeIterator()
{
}

bool XmlReader::AttributeIterator::next()
{
    bool res;
    if (first) {
        res = EM_ASM_INT({
            const doc = window.xmlDocs[$0];
            if (!doc.currentNode.hasAttributes()) {
                return false;
            }
            doc.currentAttribute = 0;
            return true;
            }, reader);
    } else {
        res = EM_ASM_INT({
            const doc = window.xmlDocs[$0];
            if (doc.currentAttribute + 1 >= doc.currentNode.attributes.length) {
                return false;
            }
            doc.currentAttribute++;
            return true;
            }, reader);
    }
    if (!res)
    {
        last = true;
    }
    first = false;
    return res;
}

std::string XmlReader::AttributeIterator::getName()
{
    const char* value = (const char*)EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        const str = doc.currentNode.attributes[doc.currentAttribute].name || "";
        const strLength = lengthBytesUTF8(str) + 1;
        const ptr = Module._malloc(strLength);
        stringToUTF8(str, ptr, strLength);

        return ptr;
        }, reader);
    return std::string(value);
}

std::string XmlReader::AttributeIterator::getValue()
{
    const char* value = (const char*)EM_ASM_INT({
        const doc = window.xmlDocs[$0];
        const str = doc.currentNode.attributes[doc.currentAttribute].value || "";
        const strLength = lengthBytesUTF8(str) + 1;
        const ptr = Module._malloc(strLength);
        stringToUTF8(str, ptr, strLength);

        return ptr;
        }, reader);
    return std::string(value);
}
