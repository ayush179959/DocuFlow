// Simple in-memory storage for demo purposes
// In a real app, this would connect to a database

import type { DocumentTemplate } from "@/data/templates"
import type { Product } from "@/data/products"
import type { DigitalSignature } from "@/data/signatures"
import type { Document } from "@/data/documents"

class StorageService {
  private templates: DocumentTemplate[] = []
  private products: Product[] = []
  private signatures: DigitalSignature[] = []
  private documents: Document[] = []

  // Templates
  async getTemplates(): Promise<DocumentTemplate[]> {
    return this.templates
  }

  async createTemplate(template: Omit<DocumentTemplate, "id" | "createdAt" | "updatedAt">): Promise<DocumentTemplate> {
    const newTemplate: DocumentTemplate = {
      ...template,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.templates.push(newTemplate)
    return newTemplate
  }

  async updateTemplate(id: number, updates: Partial<DocumentTemplate>): Promise<DocumentTemplate | null> {
    const index = this.templates.findIndex((t) => t.id === id)
    if (index === -1) return null

    this.templates[index] = {
      ...this.templates[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.templates[index]
  }

  async deleteTemplate(id: number): Promise<boolean> {
    const index = this.templates.findIndex((t) => t.id === id)
    if (index === -1) return false

    this.templates.splice(index, 1)
    return true
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.products
  }

  async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.products.push(newProduct)
    return newProduct
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.products[index]
  }

  async deleteProduct(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    return true
  }

  // Signatures
  async getSignatures(): Promise<DigitalSignature[]> {
    return this.signatures
  }

  async createSignature(
    signature: Omit<DigitalSignature, "id" | "createdAt" | "updatedAt">,
  ): Promise<DigitalSignature> {
    const newSignature: DigitalSignature = {
      ...signature,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.signatures.push(newSignature)
    return newSignature
  }

  async updateSignature(id: number, updates: Partial<DigitalSignature>): Promise<DigitalSignature | null> {
    const index = this.signatures.findIndex((s) => s.id === id)
    if (index === -1) return null

    this.signatures[index] = {
      ...this.signatures[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.signatures[index]
  }

  async deleteSignature(id: number): Promise<boolean> {
    const index = this.signatures.findIndex((s) => s.id === id)
    if (index === -1) return false

    this.signatures.splice(index, 1)
    return true
  }

  // Documents
  async getDocuments(): Promise<Document[]> {
    return this.documents
  }

  async createDocument(document: Omit<Document, "id" | "createdAt" | "updatedAt">): Promise<Document> {
    const newDocument: Document = {
      ...document,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.documents.push(newDocument)
    return newDocument
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document | null> {
    const index = this.documents.findIndex((d) => d.id === id)
    if (index === -1) return null

    this.documents[index] = {
      ...this.documents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.documents[index]
  }

  async deleteDocument(id: number): Promise<boolean> {
    const index = this.documents.findIndex((d) => d.id === id)
    if (index === -1) return false

    this.documents.splice(index, 1)
    return true
  }

  // Initialize with sample data
  async initialize() {
    const { documentTemplates } = await import("@/data/templates")
    const { productCatalogue } = await import("@/data/products")
    const { digitalSignatures } = await import("@/data/signatures")
    const { documents } = await import("@/data/documents")

    this.templates = [...documentTemplates]
    this.products = [...productCatalogue]
    this.signatures = [...digitalSignatures]
    this.documents = [...documents]
  }
}

export const storageService = new StorageService()
