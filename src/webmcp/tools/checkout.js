import { WEBMCP_TOOL_PREFIX } from "../constants"

export const createCheckoutTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.checkout`,
  description:
    "Navigate to the checkout page to complete the purchase. The shopper must be signed in, and must still enter payment details themselves.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: false },
  execute: async () => {
    const { cart: cartState, isAuthenticated, navigate } = stateRef.current
    if (!cartState.cart.length) {
      return JSON.stringify({ error: "Cart is empty, nothing to check out." })
    }
    navigate("/checkout")
    return JSON.stringify({
      success: true,
      authenticated: isAuthenticated,
      note: isAuthenticated
        ? "Navigated to /checkout."
        : "Navigated to /checkout, but the shopper is not signed in and will be redirected home.",
    })
  },
})
