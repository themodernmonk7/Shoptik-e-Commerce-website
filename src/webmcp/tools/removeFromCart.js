import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createRemoveFromCartTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.remove_from_cart`,
  description: "Remove an item from the cart.",
  inputSchema: {
    type: "object",
    properties: {
      cartItemId: {
        type: "string",
        description: "The cart item id (productId+color)",
      },
    },
    required: ["cartItemId"],
  },
  annotations: { readOnlyHint: false },
  execute: async (input) => {
    stateRef.current.cart.removeItem(input.cartItemId)
    return JSON.stringify({ success: true })
  },
})
