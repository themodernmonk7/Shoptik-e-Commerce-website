import { WEBMCP_TOOL_PREFIX } from "../constants"
import { matchesText, toProductSummary } from "../helpers"

export const createSearchProductsTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.search_products`,
  description:
    "Search the product catalog by free text, category, company, color, or price range.",
  inputSchema: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "Free text matched against name/description/company",
      },
      category: { type: "string" },
      company: { type: "string" },
      color: { type: "string" },
      min_price: { type: "number" },
      max_price: { type: "number" },
    },
  },
  annotations: { readOnlyHint: true },
  execute: async (input = {}) => {
    const { products: allProducts } = stateRef.current.products
    const { text, category, company, color, min_price, max_price } = input

    const matches = (allProducts || []).filter((product) => {
      if (!matchesText(product, text)) return false
      if (category && category !== "all" && product.category !== category)
        return false
      if (company && company !== "all" && product.company !== company)
        return false
      if (color && color !== "all" && !product.colors?.includes(color))
        return false
      if (typeof min_price === "number" && product.price < min_price)
        return false
      if (typeof max_price === "number" && product.price > max_price)
        return false
      return true
    })

    return JSON.stringify({
      count: matches.length,
      products: matches.map(toProductSummary),
    })
  },
})
