import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createGetProductDetailsTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.get_product_details`,
  description: "Get full details for a single product by id.",
  inputSchema: {
    type: "object",
    properties: { productId: { type: "string" } },
    required: ["productId"],
  },
  annotations: { readOnlyHint: true },
  execute: async (input) => {
    const { products: allProducts } = stateRef.current.products
    const product = (allProducts || []).find(
      (p) => String(p.id) === String(input.productId)
    )
    if (!product) {
      return JSON.stringify({
        error: `No product found with id ${input.productId}`,
      })
    }
    return JSON.stringify(product)
  },
})
