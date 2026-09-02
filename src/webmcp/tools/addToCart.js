import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createAddToCartTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.add_to_cart`,
  description: "Add a product to the shopping cart.",
  inputSchema: {
    type: "object",
    properties: {
      productId: { type: "string" },
      color: {
        type: "string",
        description: "Defaults to the product's first available color",
      },
      quantity: { type: "number", description: "Defaults to 1" },
    },
    required: ["productId"],
  },
  annotations: { readOnlyHint: false },
  execute: async (input) => {
    const { products: allProducts } = stateRef.current.products
    const { cart: cartState } = stateRef.current
    const product = (allProducts || []).find(
      (p) => String(p.id) === String(input.productId)
    )
    if (!product) {
      return JSON.stringify({
        error: `No product found with id ${input.productId}`,
      })
    }
    if (product.stock < 1) {
      return JSON.stringify({ error: `${product.name} is out of stock` })
    }
    const color = input.color || product.colors?.[0]
    const quantity = Math.min(
      Math.max(Number(input.quantity) || 1, 1),
      product.stock
    )
    cartState.addToCart(product.id, color, quantity, product)
    return JSON.stringify({
      success: true,
      added: { productId: product.id, name: product.name, color, quantity },
    })
  },
})
