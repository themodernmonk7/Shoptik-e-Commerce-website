import { WEBMCP_TOOL_PREFIX } from "../constants"
import { formatPrice } from "../../utils/helper"

export const createGetCartTool = (stateRef) => ({
  name: `${WEBMCP_TOOL_PREFIX}.get_cart`,
  description: "Get the current shopping cart contents and totals.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: true },
  execute: async () => {
    const { cart: cartState } = stateRef.current
    return JSON.stringify({
      items: cartState.cart,
      total_items: cartState.total_items,
      total_amount: cartState.total_amount,
      formatted_total_amount: formatPrice(cartState.total_amount),
      shipping_fee: cartState.shipping_fee,
    })
  },
})
