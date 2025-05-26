export interface Document {
  id: number
  title: string
  status: "pending" | "sent_for_approval" | "approved" | "draft"
  value: string
  modified: string
  isImportant: boolean
  folder: string
  content: string
  templateId?: number
  products: number[]
  signatureId?: number
  createdAt: string
  updatedAt: string
}

export const documents: Document[] = [
  {
    id: 1,
    title: "Service Agreement - ABC Corp",
    status: "approved",
    value: "$15,000",
    modified: "2024-01-15",
    isImportant: true,
    folder: "Contracts",
    content: "Service agreement content...",
    templateId: 1,
    products: [1, 3],
    signatureId: 1,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Product Quote - XYZ Ltd",
    status: "pending",
    value: "$8,500",
    modified: "2024-01-14",
    isImportant: false,
    folder: "Sales",
    content: "Product quote content...",
    templateId: 2,
    products: [2, 4],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    title: "NDA - Tech Startup",
    status: "sent_for_approval",
    value: "$0",
    modified: "2024-01-13",
    isImportant: true,
    folder: "Legal",
    content: "NDA content...",
    templateId: 5,
    products: [],
    signatureId: 2,
    createdAt: "2024-01-11",
    updatedAt: "2024-01-13",
  },
  {
    id: 4,
    title: "Invoice #001234",
    status: "draft",
    value: "$3,200",
    modified: "2024-01-12",
    isImportant: false,
    folder: "Finance",
    content: "Invoice content...",
    templateId: 3,
    products: [5],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: 5,
    title: "Proposal - Marketing Campaign",
    status: "approved",
    value: "$25,000",
    modified: "2024-01-11",
    isImportant: true,
    folder: "Sales",
    content: "Proposal content...",
    templateId: 4,
    products: [1, 2, 3],
    signatureId: 3,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-11",
  },
]

export const folders = [
  { name: "Contracts", count: 12 },
  { name: "Sales", count: 8 },
  { name: "Legal", count: 5 },
  { name: "Finance", count: 15 },
  { name: "Operations", count: 3 },
]
