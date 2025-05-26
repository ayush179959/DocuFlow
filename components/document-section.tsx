"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MoreVertical, Trash2, GripVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DocumentSectionProps {
  id: string
  type: "text" | "table" | "image" | "signature"
  content: string
  width?: number
  height?: number
  onUpdate: (id: string, content: string, width?: number, height?: number) => void
  onDelete: (id: string) => void
  fontSize: string
}

export function DocumentSection({
  id,
  type,
  content,
  width = 100,
  height = 200,
  onUpdate,
  onDelete,
  fontSize,
}: DocumentSectionProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [currentWidth, setCurrentWidth] = useState(width)
  const [currentHeight, setCurrentHeight] = useState(height)

  const handleContentChange = (newContent: string) => {
    onUpdate(id, newContent, currentWidth, currentHeight)
  }

  const handleResize = (newWidth: number, newHeight: number) => {
    setCurrentWidth(newWidth)
    setCurrentHeight(newHeight)
    onUpdate(id, content, newWidth, newHeight)
  }

  const renderContent = () => {
    switch (type) {
      case "text":
        return (
          <Textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full h-full resize-none border-0 focus:ring-0 focus:outline-none"
            style={{ fontSize: `${fontSize}px`, minHeight: `${currentHeight}px` }}
            placeholder="Enter text content..."
          />
        )
      case "table":
        return (
          <div className="w-full h-full border border-gray-200 rounded">
            <table className="w-full h-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2">Column 1</th>
                  <th className="border border-gray-200 p-2">Column 2</th>
                  <th className="border border-gray-200 p-2">Column 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2">
                    <Input className="border-0" placeholder="Data 1" />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input className="border-0" placeholder="Data 2" />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input className="border-0" placeholder="Data 3" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      case "image":
        return (
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Click to upload image</p>
              <Input type="file" accept="image/*" className="mt-2" />
            </div>
          </div>
        )
      case "signature":
        return (
          <div className="w-full h-full border border-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Signature placeholder</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="relative group mb-4" style={{ width: `${currentWidth}%` }}>
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Section
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-4">{renderContent()}</div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-300 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  )
}
