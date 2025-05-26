"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Image,
  FilePenLineIcon as Signature,
  Plus,
  Trash2,
  Upload,
  Save,
  Eye,
  Send,
  Download,
  Share2,
} from "lucide-react"

interface DocumentSection {
  id: string
  type: "text" | "table" | "image" | "signature"
  title: string
  content: string
  width: number
  height: number
}

interface DocumentEditorProps {
  sections: DocumentSection[]
  onUpdateSection: (id: string, updates: Partial<DocumentSection>) => void
  onDeleteSection: (id: string) => void
  selectedSectionId?: string
  fontSize: string
  fontFamily: string
  onFontSizeChange: (size: string) => void
  onFontFamilyChange: (family: string) => void
  onSave: () => void
  onPreview: () => void
  onSendForApproval: () => void
  onExport: () => void
  onShare: () => void
}

export function DocumentEditor({
  sections,
  onUpdateSection,
  onDeleteSection,
  selectedSectionId,
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange,
  onSave,
  onPreview,
  onSendForApproval,
  onExport,
  onShare,
}: DocumentEditorProps) {
  const [pages, setPages] = useState(1)
  const editorRef = useRef<HTMLDivElement>(null)

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Verdana",
    "Courier New",
    "Comic Sans MS",
    "Impact",
    "Trebuchet MS",
    "Palatino",
  ]

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle font file upload
      console.log("Font file uploaded:", file.name)
    }
  }

  const addPage = () => {
    setPages(pages + 1)
  }

  const deletePage = () => {
    if (pages > 1) {
      setPages(pages - 1)
    }
  }

  const renderSection = (section: DocumentSection) => {
    switch (section.type) {
      case "text":
        return (
          <div
            className="min-h-[200px] p-4 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-orange-500"
            style={{ width: `${section.width}%` }}
          >
            <Textarea
              value={section.content}
              onChange={(e) => onUpdateSection(section.id, { content: e.target.value })}
              className="w-full h-full min-h-[180px] resize-none border-0 focus:ring-0 focus:outline-none"
              style={{ fontSize: `${fontSize}px`, fontFamily }}
              placeholder="Enter text content..."
            />
          </div>
        )
      case "table":
        return (
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ width: `${section.width}%` }}>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 p-3 text-left">
                    <Input placeholder="Header 1" className="border-0 bg-transparent" />
                  </th>
                  <th className="border border-gray-200 p-3 text-left">
                    <Input placeholder="Header 2" className="border-0 bg-transparent" />
                  </th>
                  <th className="border border-gray-200 p-3 text-left">
                    <Input placeholder="Header 3" className="border-0 bg-transparent" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((row) => (
                  <tr key={row}>
                    <td className="border border-gray-200 p-3">
                      <Input placeholder={`Row ${row}, Col 1`} className="border-0" />
                    </td>
                    <td className="border border-gray-200 p-3">
                      <Input placeholder={`Row ${row}, Col 2`} className="border-0" />
                    </td>
                    <td className="border border-gray-200 p-3">
                      <Input placeholder={`Row ${row}, Col 3`} className="border-0" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case "image":
        return (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            style={{ width: `${section.width}%`, height: `${section.height}px` }}
          >
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload image</p>
            <Input type="file" accept="image/*" className="max-w-xs mx-auto" />
          </div>
        )
      case "signature":
        return (
          <div
            className="border border-gray-200 rounded-lg p-4 text-center"
            style={{ width: `${section.width}%`, height: `${section.height}px` }}
          >
            <Signature className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Signature placeholder</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Document Editor</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={onSendForApproval}>
              <Send className="w-4 h-4 mr-2" />
              Send for Approval
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={onSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-wrap gap-2">
          {/* Font Controls */}
          <div className="flex items-center space-x-2">
            <Select value={fontFamily} onValueChange={onFontFamilyChange}>
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
            <Select value={fontSize} onValueChange={onFontSizeChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 12, 14, 16, 18, 20, 24, 28, 32, 36].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={handleFileUpload}
                className="hidden"
                id="font-upload"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="font-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Font
                </label>
              </Button>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Text Formatting */}
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={() => executeCommand("bold")} className="hover:bg-orange-100">
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => executeCommand("italic")}
              className="hover:bg-orange-100"
            >
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

          {/* Alignment */}
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

          {/* Lists */}
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

          <Separator orientation="vertical" className="h-6" />

          {/* Page Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={addPage}>
              <Plus className="w-4 h-4 mr-1" />
              Add Page
            </Button>
            <Button variant="outline" size="sm" onClick={deletePage} disabled={pages <= 1}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Page
            </Button>
            <span className="text-sm text-gray-600">
              {pages} page{pages !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8 space-y-8">
            {Array.from({ length: pages }, (_, pageIndex) => (
              <Card key={pageIndex} className="w-full max-w-4xl mx-auto min-h-[800px] shadow-lg">
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 text-xs text-gray-400">Page {pageIndex + 1}</div>

                  <div className="space-y-6" ref={pageIndex === 0 ? editorRef : undefined}>
                    {sections
                      .filter((section) => section.id.includes(`page-${pageIndex}`))
                      .map((section) => (
                        <div
                          key={section.id}
                          className={`relative group ${
                            selectedSectionId === section.id ? "ring-2 ring-orange-500 rounded-lg" : ""
                          }`}
                        >
                          <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteSection(section.id)}
                              className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          {renderSection(section)}
                        </div>
                      ))}

                    {/* Default content area for page 1 if no sections */}
                    {pageIndex === 0 && sections.length === 0 && (
                      <div
                        contentEditable
                        className="min-h-[600px] p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
                        style={{ fontSize: `${fontSize}px`, fontFamily }}
                        suppressContentEditableWarning={true}
                        data-placeholder="Start writing your document..."
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
