import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createUpdateCartItemQuantityTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.update_cart_item_quantity`,
  description:
    "Increase or decrease the quantity of an item already in the cart by one unit.",
  inputSchema: {
    type: "object",
    properties: {
      cartItemId: {
        type: "string",
        description:
          "The cart item id (productId+color), as returned by get_cart",
      },
      direction: { type: "string", enum: ["increase", "decrease"] },
    },
    required: ["cartItemId", "direction"],
  },
  annotations: { readOnlyHint: false },
  execute: async (input) => {
    stateRef.current.cart.toggleAmount(input.cartItemId, input.direction)
    return JSON.stringify({ success: true })
  },
})
