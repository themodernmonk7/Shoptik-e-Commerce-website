import { formatPrice } from "../utils/helper"

export const toProductSummary = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  formattedPrice: formatPrice(product.price),
  category: product.category,
  company: product.company,
  colors: product.colors,
  stock: product.stock,
})

export const matchesText = (product, text) => {
  if (!text) return true
  const needle = text.toLowerCase()
  return (
    product.name?.toLowerCase().includes(needle) ||
    product.company?.toLowerCase().includes(needle) ||
    product.description?.toLowerCase().includes(needle)
  )
}
