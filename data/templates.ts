export interface DocumentTemplate {
  id: number
  name: string
  description: string
  category: string
  preview: string
  isImportant: boolean
  content: string
  createdAt: string
  updatedAt: string
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 1,
    name: "Service Agreement",
    description: "Professional services contract template",
    category: "Contracts",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: false,
    content: `# Service Agreement

**Agreement Date:** [DATE]
**Client:** [CLIENT_NAME]
**Service Provider:** [PROVIDER_NAME]

## 1. Services to be Provided
[SERVICES_DESCRIPTION]

## 2. Terms and Conditions
[TERMS_CONDITIONS]

## 3. Payment Terms
[PAYMENT_TERMS]

## 4. Signatures
**Client Signature:** ___________________
**Provider Signature:** ___________________`,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Product Quote",
    description: "Detailed product quotation template",
    category: "Sales",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: true,
    content: `# Product Quotation

**Quote Number:** [QUOTE_NUMBER]
**Date:** [DATE]
**Valid Until:** [VALID_DATE]

## Customer Information
**Company:** [COMPANY_NAME]
**Contact:** [CONTACT_NAME]
**Email:** [EMAIL]

## Products & Services
[PRODUCT_TABLE]

## Total Amount
**Subtotal:** [SUBTOTAL]
**Tax:** [TAX]
**Total:** [TOTAL]

## Terms & Conditions
[TERMS]`,
    createdAt: "2024-01-02",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Invoice Template",
    description: "Professional invoice template",
    category: "Finance",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: false,
    content: `# Invoice

**Invoice Number:** [INVOICE_NUMBER]
**Date:** [DATE]
**Due Date:** [DUE_DATE]

## Bill To
[CUSTOMER_INFO]

## Invoice Details
[INVOICE_ITEMS]

**Total Amount Due:** [TOTAL]

## Payment Instructions
[PAYMENT_INSTRUCTIONS]`,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-17",
  },
  {
    id: 4,
    name: "Proposal Template",
    description: "Business proposal template",
    category: "Sales",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: false,
    content: `# Business Proposal

**Proposal Date:** [DATE]
**Prepared For:** [CLIENT_NAME]
**Prepared By:** [COMPANY_NAME]

## Executive Summary
[EXECUTIVE_SUMMARY]

## Project Overview
[PROJECT_OVERVIEW]

## Proposed Solution
[SOLUTION]

## Timeline
[TIMELINE]

## Investment
[PRICING]`,
    createdAt: "2024-01-04",
    updatedAt: "2024-01-18",
  },
  {
    id: 5,
    name: "NDA Agreement",
    description: "Non-disclosure agreement template",
    category: "Legal",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: true,
    content: `# Non-Disclosure Agreement

**Effective Date:** [DATE]
**Disclosing Party:** [PARTY_1]
**Receiving Party:** [PARTY_2]

## 1. Definition of Confidential Information
[CONFIDENTIAL_INFO_DEFINITION]

## 2. Obligations
[OBLIGATIONS]

## 3. Term
[TERM]

## 4. Signatures
[SIGNATURES]`,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
  },
  {
    id: 6,
    name: "Material Submission",
    description: "Material submission form template",
    category: "Operations",
    preview: "/placeholder.svg?height=200&width=300",
    isImportant: false,
    content: `# Material Submission Form

**Submission Date:** [DATE]
**Project:** [PROJECT_NAME]
**Submitted By:** [SUBMITTER]

## Material Details
[MATERIAL_TABLE]

## Quality Specifications
[SPECIFICATIONS]

## Approval
**Approved By:** ___________________
**Date:** ___________________`,
    createdAt: "2024-01-06",
    updatedAt: "2024-01-20",
  },
]
