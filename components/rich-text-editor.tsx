"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  fontSize: string
  onFontSizeChange: (size: string) => void
  fontFamily: string
  onFontFamilyChange: (family: string) => void
}

export function RichTextEditor({
  content,
  onChange,
  fontSize,
  onFontSizeChange,
  fontFamily,
  onFontFamilyChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const handleSelectionChange = () => {
    const selection = window.getSelection()
    if (selection) {
      setSelectedText(selection.toString())
    }
  }

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleFontSizeChange = (size: string) => {
    onFontSizeChange(size)
    if (selectedText) {
      executeCommand("fontSize", "3")
      // Apply custom font size to selection
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const span = document.createElement("span")
        span.style.fontSize = `${size}px`
        try {
          range.surroundContents(span)
        } catch (e) {
          span.appendChild(range.extractContents())
          range.insertNode(span)
        }
        selection.removeAllRanges()
      }
    }
  }

  const handleFontFamilyChange = (family: string) => {
    onFontFamilyChange(family)
    if (selectedText) {
      executeCommand("fontName", family)
    }
  }

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Verdana",
    "Courier New",
    "Comic Sans MS",
    "Impact",
  ]

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center space-x-4 flex-wrap gap-2 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center space-x-2">
          <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font }}>{font}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="18">18px</SelectItem>
              <SelectItem value="20">20px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="28">28px</SelectItem>
              <SelectItem value="32">32px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" onClick={() => executeCommand("bold")} className="hover:bg-orange-100">
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => executeCommand("italic")} className="hover:bg-orange-100">
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("underline")}
            className="hover:bg-orange-100"
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("justifyLeft")}
            className="hover:bg-orange-100"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("justifyCenter")}
            className="hover:bg-orange-100"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("justifyRight")}
            className="hover:bg-orange-100"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("justifyFull")}
            className="hover:bg-orange-100"
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("insertUnorderedList")}
            className="hover:bg-orange-100"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => executeCommand("insertOrderedList")}
            className="hover:bg-orange-100"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        style={{ fontFamily, fontSize: `${fontSize}px` }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}
