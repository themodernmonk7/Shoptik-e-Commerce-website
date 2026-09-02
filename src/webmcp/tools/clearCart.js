import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createClearCartTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.clear_cart`,
  description: "Remove all items from the cart.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: false },
  execute: async () => {
    stateRef.current.cart.clearCart()
    return JSON.stringify({ success: true })
  },
})
