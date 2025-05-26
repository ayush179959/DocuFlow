"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Upload,
  Edit3,
  Plus,
  Download,
  Share2,
  FilePenLineIcon as Signature,
  X,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  PenTool,
  Send,
  Archive,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

import type { DocumentTemplate } from "@/data/templates"
import type { Product } from "@/data/products"
import type { DigitalSignature } from "@/data/signatures"
import type { Document } from "@/data/documents"
import { storageService } from "@/lib/storage"
import { SignatureCanvas } from "@/components/signature-canvas"
import { DocumentBuilder } from "@/components/document-builder"
import { TemplateSaveDialog } from "@/components/template-save-dialog"
import { DataTable } from "@/components/data-table"
import { EditorSidebar } from "@/components/editor-sidebar"
import { DocumentEditor } from "@/components/document-editor"

interface DocumentSection {
  id: string
  type: "text" | "table" | "image" | "signature"
  title: string
  content: string
  width: number
  height: number
}

export default function PandaDocAlternative() {
  // Data states
  const [templates, setTemplates] = useState<DocumentTemplate[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [signatures, setSignatures] = useState<DigitalSignature[]>([])
  const [documents, setDocuments] = useState<Document[]>([])

  // UI states
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedSignature, setSelectedSignature] = useState<DigitalSignature | null>(null)
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isCreateSignatureOpen, setIsCreateSignatureOpen] = useState(false)
  const [isTemplateSaveOpen, setIsTemplateSaveOpen] = useState(false)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isEditSignatureOpen, setIsEditSignatureOpen] = useState(false)
  const [isSelectDocumentOpen, setIsSelectDocumentOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("templates")
  const [documentContent, setDocumentContent] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [fontSize, setFontSize] = useState("14")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [documentSections, setDocumentSections] = useState<DocumentSection[]>([])
  const [selectedSectionId, setSelectedSectionId] = useState<string>()

  // Form states
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    use: "",
    price: "",
    category: "",
    description: "",
  })
  const [editProductForm, setEditProductForm] = useState<Product | null>(null)
  const [editSignatureForm, setEditSignatureForm] = useState<DigitalSignature | null>(null)
  const [newSignatureName, setNewSignatureName] = useState("")

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      await storageService.initialize()
      setTemplates(await storageService.getTemplates())
      setProducts(await storageService.getProducts())
      setSignatures(await storageService.getSignatures())
      setDocuments(await storageService.getDocuments())
    }
    initializeData()
  }, [])

  // Template operations
  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template)
    setDocumentContent(template.content)
    setActiveTab("editor")
  }

  const handleTemplateDelete = async (id: number) => {
    try {
      await storageService.deleteTemplate(id)
      setTemplates(await storageService.getTemplates())
      toast({ title: "Template deleted successfully" })
    } catch (error) {
      toast({ title: "Error deleting template", variant: "destructive" })
    }
  }

  const handleTemplateToggleImportant = async (id: number) => {
    try {
      const template = templates.find((t) => t.id === id)
      if (template) {
        await storageService.updateTemplate(id, { isImportant: !template.isImportant })
        setTemplates(await storageService.getTemplates())
        toast({ title: `Template ${template.isImportant ? "removed from" : "added to"} important` })
      }
    } catch (error) {
      toast({ title: "Error updating template", variant: "destructive" })
    }
  }

  // Product operations
  const handleProductSelect = (product: Product) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const handleProductRemove = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const handleProductCreate = async () => {
    try {
      if (!newProductForm.name || !newProductForm.price) {
        toast({ title: "Please fill in required fields", variant: "destructive" })
        return
      }

      await storageService.createProduct(newProductForm)
      setProducts(await storageService.getProducts())
      setNewProductForm({ name: "", use: "", price: "", category: "", description: "" })
      setIsProductDialogOpen(false)
      toast({ title: "Product created successfully" })
    } catch (error) {
      toast({ title: "Error creating product", variant: "destructive" })
    }
  }

  const handleProductEdit = (product: Product) => {
    setEditProductForm(product)
    setIsEditProductOpen(true)
  }

  const handleProductUpdate = async () => {
    try {
      if (!editProductForm) return
      await storageService.updateProduct(editProductForm.id, editProductForm)
      setProducts(await storageService.getProducts())
      setEditProductForm(null)
      setIsEditProductOpen(false)
      toast({ title: "Product updated successfully" })
    } catch (error) {
      toast({ title: "Error updating product", variant: "destructive" })
    }
  }

  const handleProductDelete = async (id: number) => {
    try {
      await storageService.deleteProduct(id)
      setProducts(await storageService.getProducts())
      setSelectedProducts(selectedProducts.filter((p) => p.id !== id))
      toast({ title: "Product deleted successfully" })
    } catch (error) {
      toast({ title: "Error deleting product", variant: "destructive" })
    }
  }

  // Signature operations
  const handleSignatureCreate = async (imageData: string) => {
    try {
      if (!newSignatureName) {
        toast({ title: "Please enter a signature name", variant: "destructive" })
        return
      }

      await storageService.createSignature({
        name: newSignatureName,
        type: "Handwritten",
        preview: imageData,
        imageData,
      })
      setSignatures(await storageService.getSignatures())
      setNewSignatureName("")
      setIsCreateSignatureOpen(false)
      toast({ title: "Signature created successfully" })
    } catch (error) {
      toast({ title: "Error creating signature", variant: "destructive" })
    }
  }

  const handleSignatureUpload = async (file: File) => {
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        await storageService.createSignature({
          name: newSignatureName || file.name,
          type: "Uploaded",
          preview: imageData,
          imageData,
        })
        setSignatures(await storageService.getSignatures())
        setNewSignatureName("")
        setIsUploadDialogOpen(false)
        toast({ title: "Signature uploaded successfully" })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast({ title: "Error uploading signature", variant: "destructive" })
    }
  }

  const handleSignatureEdit = (signature: DigitalSignature) => {
    setEditSignatureForm(signature)
    setIsEditSignatureOpen(true)
  }

  const handleSignatureUpdate = async () => {
    try {
      if (!editSignatureForm) return
      await storageService.updateSignature(editSignatureForm.id, editSignatureForm)
      setSignatures(await storageService.getSignatures())
      setEditSignatureForm(null)
      setIsEditSignatureOpen(false)
      toast({ title: "Signature updated successfully" })
    } catch (error) {
      toast({ title: "Error updating signature", variant: "destructive" })
    }
  }

  const handleSignatureDelete = async (id: number) => {
    try {
      await storageService.deleteSignature(id)
      setSignatures(await storageService.getSignatures())
      if (selectedSignature?.id === id) {
        setSelectedSignature(null)
      }
      toast({ title: "Signature deleted successfully" })
    } catch (error) {
      toast({ title: "Error deleting signature", variant: "destructive" })
    }
  }

  // Document operations
  const handleDocumentSave = async () => {
    try {
      const newDocument = {
        title: `Document ${Date.now()}`,
        status: "draft" as const,
        value: selectedProducts.length > 0 ? calculateTotalValue(selectedProducts) : "$0",
        modified: new Date().toISOString().split("T")[0],
        isImportant: false,
        folder: "General",
        content: documentContent,
        templateId: selectedTemplate?.id,
        products: selectedProducts.map((p) => p.id),
        signatureId: selectedSignature?.id,
      }

      await storageService.createDocument(newDocument)
      setDocuments(await storageService.getDocuments())
      toast({ title: "Document saved successfully" })
    } catch (error) {
      toast({ title: "Error saving document", variant: "destructive" })
    }
  }

  const handleDocumentSaveAsTemplate = async (templateData: {
    name: string
    description: string
    category: string
  }) => {
    try {
      await storageService.createTemplate({
        name: templateData.name,
        description: templateData.description,
        category: templateData.category,
        preview: "/placeholder.svg?height=200&width=300",
        isImportant: false,
        content: documentContent,
      })
      setTemplates(await storageService.getTemplates())
      toast({ title: "Template saved successfully" })
    } catch (error) {
      toast({ title: "Error saving template", variant: "destructive" })
    }
  }

  const handleSendForApproval = async () => {
    try {
      toast({ title: "Document sent for approval" })
    } catch (error) {
      toast({ title: "Error sending for approval", variant: "destructive" })
    }
  }

  // Export and Share operations
  const handleExportPDF = async () => {
    try {
      const blob = new Blob([documentContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "document.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({ title: "PDF exported successfully" })
    } catch (error) {
      toast({ title: "Error exporting PDF", variant: "destructive" })
    }
  }

  const handleExportDOC = async () => {
    try {
      const blob = new Blob([documentContent], { type: "application/msword" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "document.doc"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({ title: "DOC exported successfully" })
    } catch (error) {
      toast({ title: "Error exporting DOC", variant: "destructive" })
    }
  }

  const handleExport = () => {
    // Show dropdown with PDF and DOC options
    const dropdown = document.createElement("div")
    dropdown.innerHTML = `
      <div class="bg-white border rounded shadow-lg p-2">
        <button onclick="handleExportPDF()" class="block w-full text-left px-3 py-2 hover:bg-gray-100">Export as PDF</button>
        <button onclick="handleExportDOC()" class="block w-full text-left px-3 py-2 hover:bg-gray-100">Export as DOC</button>
      </div>
    `
    // Position and show dropdown
  }

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/shared/${Date.now()}`
      await navigator.clipboard.writeText(shareUrl)

      const blob = new Blob([documentContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "shared-document.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({ title: "Share URL copied to clipboard and PDF saved locally" })
    } catch (error) {
      toast({ title: "Error sharing document", variant: "destructive" })
    }
  }

  // Section operations
  const addSection = (type: "text" | "table" | "image" | "signature") => {
    const newSection: DocumentSection = {
      id: `section-${Date.now()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: "",
      width: 100,
      height: type === "text" ? 200 : type === "table" ? 300 : 150,
    }
    setDocumentSections([...documentSections, newSection])
  }

  const updateSection = (id: string, updates: Partial<DocumentSection>) => {
    setDocumentSections((sections) =>
      sections.map((section) => (section.id === id ? { ...section, ...updates } : section)),
    )
  }

  const deleteSection = (id: string) => {
    setDocumentSections((sections) => sections.filter((section) => section.id !== id))
    if (selectedSectionId === id) {
      setSelectedSectionId(undefined)
    }
  }

  // Utility functions
  const calculateTotalValue = (products: Product[]): string => {
    const total = products.reduce((sum, product) => {
      const price = Number.parseFloat(product.price.replace(/[$,]/g, ""))
      return sum + (Number.isNaN(price) ? 0 : price)
    }, 0)
    return `$${total.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-500"
      case "sent_for_approval":
        return "bg-purple-500"
      case "approved":
        return "bg-green-500"
      case "draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "sent_for_approval":
        return "Sent for Approval"
      case "approved":
        return "Approved"
      case "draft":
        return "Draft"
      default:
        return "Unknown"
    }
  }

  const sidebarItems = [
    { id: "templates", label: "Templates", icon: FileText },
    { id: "products", label: "Products", icon: Package },
    { id: "signatures", label: "Signatures", icon: Signature },
    { id: "editor", label: "Editor", icon: Edit3 },
    { id: "documents", label: "Documents", icon: Archive },
  ]

  // Table column definitions
  const templateColumns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, item: DocumentTemplate) => (
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <div className="font-medium flex items-center">
              {value}
              {item.isImportant && <Star className="w-3 h-3 ml-1 text-orange-500 fill-current" />}
            </div>
            <div className="text-xs text-gray-500">{item.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          {value}
        </Badge>
      ),
    },
    { key: "updatedAt", label: "Updated", sortable: true },
  ]

  const productColumns = [
    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (value: string, item: Product) => (
        <div className="flex items-center">
          <Package className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-gray-500">{item.category}</div>
          </div>
        </div>
      ),
    },
    { key: "use", label: "Use Case" },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value: string) => <span className="font-semibold text-orange-600">{value}</span>,
    },
    { key: "updatedAt", label: "Updated", sortable: true },
  ]

  const signatureColumns = [
    {
      key: "name",
      label: "Signature",
      sortable: true,
      render: (value: string, item: DigitalSignature) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center mr-3">
            {item.imageData ? (
              <img src={item.imageData || "/placeholder.svg"} alt={value} className="max-w-full max-h-full" />
            ) : (
              <Signature className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-gray-500">{item.type}</div>
          </div>
        </div>
      ),
    },
    { key: "type", label: "Type" },
    { key: "updatedAt", label: "Updated", sortable: true },
  ]

  const documentColumns = [
    {
      key: "title",
      label: "Document",
      sortable: true,
      render: (value: string, item: Document) => (
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <div className="font-medium flex items-center">
              {value}
              {item.isImportant && <Star className="w-3 h-3 ml-1 text-orange-500 fill-current" />}
            </div>
            <div className="text-xs text-gray-500">{item.folder}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(value)}`} />
          <span>{getStatusText(value)}</span>
        </div>
      ),
    },
    {
      key: "value",
      label: "Value",
      sortable: true,
      render: (value: string) => <span className="font-semibold">{value}</span>,
    },
    { key: "modified", label: "Modified", sortable: true },
  ]

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-gray-200 bg-white flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">DocuFlow</h1>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                onClick={() => {
                  setActiveTab(item.id)
                  setShowPreview(false)
                }}
              >
                <item.icon className="w-4 h-4" />
                {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-orange-600" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {showPreview ? (
            // Preview Section
            <div className="h-full flex flex-col">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Document Preview</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Back to Editor
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSendForApproval}>
                      <Send className="w-4 h-4 mr-2" />
                      Send for Approval
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleExportPDF}>
                          <FileText className="w-4 h-4 mr-2" />
                          Export as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDOC}>
                          <FileText className="w-4 h-4 mr-2" />
                          Export as DOC
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <Card className="max-w-4xl mx-auto">
                  <CardContent className="p-8">
                    <DocumentBuilder
                      content={documentContent}
                      products={selectedProducts}
                      signature={selectedSignature}
                      onChange={setDocumentContent}
                    />

                    {selectedSignature && (
                      <div className="space-y-4 border-t pt-6 mt-6">
                        <h2 className="text-lg font-semibold text-gray-900">Digital Signature</h2>
                        <div className="flex items-center space-x-4">
                          <div className="w-40 h-12 bg-gray-100 rounded border flex items-center justify-center">
                            {selectedSignature.imageData ? (
                              <img
                                src={selectedSignature.imageData || "/placeholder.svg"}
                                alt={selectedSignature.name}
                                className="max-w-full max-h-full"
                              />
                            ) : (
                              <Signature className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{selectedSignature.name}</p>
                            <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Main Content Tabs
            <div className="h-full flex">
              {/* Editor with Sidebar */}
              {activeTab === "editor" && (
                <>
                  <EditorSidebar
                    sections={documentSections}
                    onAddSection={addSection}
                    onDeleteSection={deleteSection}
                    onSelectSection={setSelectedSectionId}
                    selectedSectionId={selectedSectionId}
                  />
                  <DocumentEditor
                    sections={documentSections}
                    onUpdateSection={updateSection}
                    onDeleteSection={deleteSection}
                    selectedSectionId={selectedSectionId}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    onFontSizeChange={setFontSize}
                    onFontFamilyChange={setFontFamily}
                    onSave={handleDocumentSave}
                    onPreview={() => setShowPreview(true)}
                    onSendForApproval={handleSendForApproval}
                    onExport={handleExport}
                    onShare={handleShare}
                  />
                </>
              )}

              {/* Other tabs with table layouts */}
              {activeTab !== "editor" && (
                <div className="flex-1 p-6">
                  {/* Document Templates Section */}
                  {activeTab === "templates" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Document Templates</h2>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Plus className="w-4 h-4 mr-2" />
                          New Template
                        </Button>
                      </div>

                      <DataTable
                        data={templates}
                        columns={templateColumns}
                        onEdit={(template) => handleTemplateSelect(template)}
                        onDelete={handleTemplateDelete}
                        onToggleImportant={handleTemplateToggleImportant}
                        searchPlaceholder="Search templates..."
                        emptyMessage="No templates found"
                      />
                    </div>
                  )}

                  {/* Product Catalogue Section */}
                  {activeTab === "products" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Product Catalogue</h2>
                        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Product
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Product</DialogTitle>
                              <DialogDescription>Create a new product for your catalogue</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="product-name">Product Name *</Label>
                                <Input
                                  id="product-name"
                                  value={newProductForm.name}
                                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                                  placeholder="Enter product name"
                                />
                              </div>
                              <div>
                                <Label htmlFor="product-use">Use Case</Label>
                                <Textarea
                                  id="product-use"
                                  value={newProductForm.use}
                                  onChange={(e) => setNewProductForm({ ...newProductForm, use: e.target.value })}
                                  placeholder="Describe the product use case"
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label htmlFor="product-price">Price *</Label>
                                <Input
                                  id="product-price"
                                  value={newProductForm.price}
                                  onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                                  placeholder="e.g., $299/month"
                                />
                              </div>
                              <div>
                                <Label htmlFor="product-category">Category</Label>
                                <Input
                                  id="product-category"
                                  value={newProductForm.category}
                                  onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                                  placeholder="Product category"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleProductCreate} className="bg-orange-500 hover:bg-orange-600">
                                  Create Product
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {selectedProducts.length > 0 && (
                        <Card className="border-orange-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-orange-800 flex items-center justify-between">
                              Selected Products ({selectedProducts.length})
                              <Dialog open={isSelectDocumentOpen} onOpenChange={setIsSelectDocumentOpen}>
                                <DialogTrigger asChild>
                                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                    Add to Document
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Select Document</DialogTitle>
                                    <DialogDescription>
                                      Choose a document to add the selected products
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                                      {documents.map((doc) => (
                                        <Card key={doc.id} className="cursor-pointer hover:bg-gray-50 p-3">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <p className="font-medium text-sm">{doc.title}</p>
                                              <p className="text-xs text-gray-600">{doc.folder}</p>
                                            </div>
                                            <Button
                                              size="sm"
                                              onClick={() => {
                                                setIsSelectDocumentOpen(false)
                                                toast({ title: "Products added to document" })
                                              }}
                                            >
                                              Select
                                            </Button>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="outline" onClick={() => setIsSelectDocumentOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          setActiveTab("editor")
                                          setIsSelectDocumentOpen(false)
                                        }}
                                        className="bg-orange-500 hover:bg-orange-600"
                                      >
                                        Create New Document
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedProducts.map((product) => (
                                <div
                                  key={product.id}
                                  className="flex items-center justify-between p-2 bg-orange-50 rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <p className="text-xs text-gray-600">{product.price}</p>
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => handleProductRemove(product.id)}>
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                              <div className="pt-2 border-t">
                                <p className="font-semibold text-orange-600">
                                  Total: {calculateTotalValue(selectedProducts)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <DataTable
                        data={products}
                        columns={productColumns}
                        onEdit={handleProductEdit}
                        onDelete={handleProductDelete}
                        searchPlaceholder="Search products..."
                        emptyMessage="No products found"
                      />
                    </div>
                  )}

                  {/* Digital Signatures Section */}
                  {activeTab === "signatures" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Digital Signatures</h2>
                        <div className="flex space-x-3">
                          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Signature
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload Digital Signature</DialogTitle>
                                <DialogDescription>Upload your signature image</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-gray-600 mb-2">Drag and drop your signature image</p>
                                  <p className="text-sm text-gray-500">or click to browse files</p>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="mt-4"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleSignatureUpload(file)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="signature-name">Signature Name</Label>
                                  <Input
                                    id="signature-name"
                                    placeholder="Enter signature name"
                                    value={newSignatureName}
                                    onChange={(e) => setNewSignatureName(e.target.value)}
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={isCreateSignatureOpen} onOpenChange={setIsCreateSignatureOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline">
                                <PenTool className="w-4 h-4 mr-2" />
                                Create Signature
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Create Digital Signature</DialogTitle>
                                <DialogDescription>Draw your signature using the canvas below</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="new-signature-name">Signature Name</Label>
                                  <Input
                                    id="new-signature-name"
                                    placeholder="Enter signature name"
                                    value={newSignatureName}
                                    onChange={(e) => setNewSignatureName(e.target.value)}
                                  />
                                </div>
                                <SignatureCanvas
                                  onSave={handleSignatureCreate}
                                  onCancel={() => setIsCreateSignatureOpen(false)}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
                            <DialogTrigger asChild>
                              <Button className="bg-orange-500 hover:bg-orange-600">
                                <Signature className="w-4 h-4 mr-2" />
                                Select Signature
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Select Digital Signature</DialogTitle>
                                <DialogDescription>Choose a signature to use in your documents</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                                {signatures.map((signature) => (
                                  <Card
                                    key={signature.id}
                                    className={`cursor-pointer transition-all ${
                                      selectedSignature?.id === signature.id ? "ring-2 ring-orange-500" : ""
                                    }`}
                                    onClick={() => setSelectedSignature(signature)}
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-32 h-16 bg-gray-100 rounded border flex items-center justify-center">
                                          {signature.imageData ? (
                                            <img
                                              src={signature.imageData || "/placeholder.svg"}
                                              alt={signature.name}
                                              className="max-w-full max-h-full"
                                            />
                                          ) : (
                                            <Signature className="w-8 h-8 text-gray-400" />
                                          )}
                                        </div>
                                        <div>
                                          <p className="font-medium">{signature.name}</p>
                                          <p className="text-sm text-gray-600">{signature.type}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsSignatureDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-orange-500 hover:bg-orange-600"
                                  onClick={() => setIsSignatureDialogOpen(false)}
                                  disabled={!selectedSignature}
                                >
                                  Select
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <DataTable
                        data={signatures}
                        columns={signatureColumns}
                        onEdit={handleSignatureEdit}
                        onDelete={handleSignatureDelete}
                        searchPlaceholder="Search signatures..."
                        emptyMessage="No signatures found"
                      />
                    </div>
                  )}

                  {/* Documents Section */}
                  {activeTab === "documents" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Plus className="w-4 h-4 mr-2" />
                          New Document
                        </Button>
                      </div>

                      <DataTable
                        data={documents}
                        columns={documentColumns}
                        onView={(doc) => {
                          setSelectedTemplate(templates.find((t) => t.id === doc.templateId) || null)
                          setDocumentContent(doc.content)
                          setShowPreview(true)
                        }}
                        onEdit={(doc) => {
                          setSelectedTemplate(templates.find((t) => t.id === doc.templateId) || null)
                          setDocumentContent(doc.content)
                          setActiveTab("editor")
                        }}
                        onShare={(doc) => handleShare()}
                        onDownload={(doc) => handleExportPDF()}
                        searchPlaceholder="Search documents..."
                        emptyMessage="No documents found"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-product-name">Product Name</Label>
              <Input
                id="edit-product-name"
                value={editProductForm?.name || ""}
                onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value } as Product)}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="edit-product-use">Use Case</Label>
              <Textarea
                id="edit-product-use"
                value={editProductForm?.use || ""}
                onChange={(e) => setEditProductForm({ ...editProductForm, use: e.target.value } as Product)}
                placeholder="Describe the product use case"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="edit-product-price">Price</Label>
              <Input
                id="edit-product-price"
                value={editProductForm?.price || ""}
                onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value } as Product)}
                placeholder="e.g., $299/month"
              />
            </div>
            <div>
              <Label htmlFor="edit-product-category">Category</Label>
              <Input
                id="edit-product-category"
                value={editProductForm?.category || ""}
                onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value } as Product)}
                placeholder="Product category"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProductUpdate} className="bg-orange-500 hover:bg-orange-600">
                Update Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Signature Dialog */}
      <Dialog open={isEditSignatureOpen} onOpenChange={setIsEditSignatureOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Signature</DialogTitle>
            <DialogDescription>Update signature details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-signature-name">Signature Name</Label>
              <Input
                id="edit-signature-name"
                value={editSignatureForm?.name || ""}
                onChange={(e) =>
                  setEditSignatureForm({ ...editSignatureForm, name: e.target.value } as DigitalSignature)
                }
                placeholder="Enter signature name"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditSignatureOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSignatureUpdate} className="bg-orange-500 hover:bg-orange-600">
                Update Signature
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Save Dialog */}
      <TemplateSaveDialog
        open={isTemplateSaveOpen}
        onOpenChange={setIsTemplateSaveOpen}
        onSave={handleDocumentSaveAsTemplate}
        defaultName="New Template"
      />
    </div>
  )
}
