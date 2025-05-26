"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Type, Table, Image, FilePenLineIcon as Signature, Trash2, GripVertical, FileText, List } from "lucide-react"

interface DocumentSection {
  id: string
  type: "text" | "table" | "image" | "signature"
  title: string
  content?: string
}

interface EditorSidebarProps {
  sections: DocumentSection[]
  onAddSection: (type: "text" | "table" | "image" | "signature") => void
  onDeleteSection: (id: string) => void
  onSelectSection: (id: string) => void
  selectedSectionId?: string
}

export function EditorSidebar({
  sections,
  onAddSection,
  onDeleteSection,
  onSelectSection,
  selectedSectionId,
}: EditorSidebarProps) {
  const sectionTypes = [
    { type: "text" as const, label: "Text", icon: Type },
    { type: "table" as const, label: "Table", icon: Table },
    { type: "image" as const, label: "Image", icon: Image },
    { type: "signature" as const, label: "Signature", icon: Signature },
  ]

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "text":
        return Type
      case "table":
        return Table
      case "image":
        return Image
      case "signature":
        return Signature
      default:
        return FileText
    }
  }

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Document Structure</h3>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Add Section</h4>
        <div className="grid grid-cols-2 gap-2">
          {sectionTypes.map((sectionType) => {
            const Icon = sectionType.icon
            return (
              <Button
                key={sectionType.type}
                variant="outline"
                size="sm"
                onClick={() => onAddSection(sectionType.type)}
                className="flex flex-col items-center p-3 h-auto"
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs">{sectionType.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <List className="w-4 h-4 mr-2" />
            Document Sections
          </h4>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {sections.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No sections added yet</p>
            ) : (
              sections.map((section, index) => {
                const Icon = getSectionIcon(section.type)
                return (
                  <Card
                    key={section.id}
                    className={`cursor-pointer transition-all hover:shadow-sm ${
                      selectedSectionId === section.id ? "ring-2 ring-orange-500" : ""
                    }`}
                    onClick={() => onSelectSection(section.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="w-3 h-3 text-gray-400" />
                          <Icon className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium">
                              {section.title ||
                                `${section.type.charAt(0).toUpperCase() + section.type.slice(1)} ${index + 1}`}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{section.type}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteSection(section.id)
                          }}
                          className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
