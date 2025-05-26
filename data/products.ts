export interface Product {
  id: number
  name: string
  use: string
  price: string
  category: string
  description: string
  createdAt: string
  updatedAt: string
}

export const productCatalogue: Product[] = [
  {
    id: 1,
    name: "Premium Software License",
    use: "Enterprise software licensing for teams up to 100 users",
    price: "$2,999/year",
    category: "Software",
    description: "Comprehensive enterprise software solution with advanced features and priority support.",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Cloud Storage Package",
    use: "Secure cloud storage solution with 1TB capacity",
    price: "$299/month",
    category: "Storage",
    description: "High-security cloud storage with automatic backups and 99.9% uptime guarantee.",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Consulting Services",
    use: "Professional consulting for digital transformation",
    price: "$150/hour",
    category: "Services",
    description: "Expert consulting services for business process optimization and digital transformation.",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-17",
  },
  {
    id: 4,
    name: "Training Program",
    use: "Comprehensive staff training and certification",
    price: "$1,500/person",
    category: "Training",
    description: "Professional development program with certification and ongoing support.",
    createdAt: "2024-01-04",
    updatedAt: "2024-01-18",
  },
  {
    id: 5,
    name: "Support Package",
    use: "24/7 technical support and maintenance",
    price: "$500/month",
    category: "Support",
    description: "Round-the-clock technical support with guaranteed response times.",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
  },
  {
    id: 6,
    name: "Custom Development",
    use: "Bespoke software development services",
    price: "$200/hour",
    category: "Development",
    description: "Custom software development tailored to your specific business requirements.",
    createdAt: "2024-01-06",
    updatedAt: "2024-01-20",
  },
]
