export interface DigitalSignature {
  id: number
  name: string
  type: string
  preview: string
  imageData?: string
  createdAt: string
  updatedAt: string
}

export const digitalSignatures: DigitalSignature[] = [
  {
    id: 1,
    name: "John Smith Signature",
    type: "Handwritten",
    preview: "/placeholder.svg?height=60&width=150",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Corporate Seal",
    type: "Official",
    preview: "/placeholder.svg?height=60&width=150",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Digital Signature",
    type: "Electronic",
    preview: "/placeholder.svg?height=60&width=150",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-17",
  },
]
