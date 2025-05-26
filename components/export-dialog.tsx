"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ExportDialogProps {
  onExportPDF: () => void
  onExportDOC: () => void
  onShare: () => void
}

export function ExportDialog({ onExportPDF, onExportDOC, onShare }: ExportDialogProps) {
  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportDOC}>
            <FileText className="w-4 h-4 mr-2" />
            Export as DOC
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" size="sm" onClick={onShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  )
}
