"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/data/products"
import type { DigitalSignature } from "@/data/signatures"

interface DocumentBuilderProps {
  content: string
  products: Product[]
  signature?: DigitalSignature
  onChange: (content: string) => void
}

export function DocumentBuilder({ content, products, signature, onChange }: DocumentBuilderProps) {
  const [processedContent, setProcessedContent] = useState(content)

  useEffect(() => {
    let processed = content

    // Replace product table placeholder
    if (products.length > 0) {
      const productTable = `
| Product/Service | Description | Price |
|----------------|-------------|-------|
${products.map((product) => `| ${product.name} | ${product.use} | ${product.price} |`).join("\n")}

**Total Value:** ${calculateTotal(products)}
`
      processed = processed.replace("[PRODUCT_TABLE]", productTable)
    }

    // Replace common placeholders
    processed = processed.replace("[DATE]", new Date().toLocaleDateString())
    processed = processed.replace("[QUOTE_NUMBER]", `Q-${Date.now().toString().slice(-6)}`)
    processed = processed.replace("[INVOICE_NUMBER]", `INV-${Date.now().toString().slice(-6)}`)

    // Calculate totals
    if (products.length > 0) {
      const subtotal = calculateSubtotal(products)
      const tax = subtotal * 0.1 // 10% tax
      const total = subtotal + tax

      processed = processed.replace("[SUBTOTAL]", `$${subtotal.toLocaleString()}`)
      processed = processed.replace("[TAX]", `$${tax.toLocaleString()}`)
      processed = processed.replace("[TOTAL]", `$${total.toLocaleString()}`)
    }

    setProcessedContent(processed)
    onChange(processed)
  }, [content, products, signature, onChange])

  const calculateSubtotal = (products: Product[]): number => {
    return products.reduce((sum, product) => {
      const price = Number.parseFloat(product.price.replace(/[$,]/g, ""))
      return sum + (Number.isNaN(price) ? 0 : price)
    }, 0)
  }

  const calculateTotal = (products: Product[]): string => {
    const subtotal = calculateSubtotal(products)
    const tax = subtotal * 0.1
    const total = subtotal + tax
    return `$${total.toLocaleString()}`
  }

  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: processedContent.replace(/\n/g, "<br>") }} />
    </div>
  )
}
