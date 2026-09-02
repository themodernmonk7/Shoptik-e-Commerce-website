import { createSearchProductsTool } from "./searchProducts"
import { createGetProductDetailsTool } from "./getProductDetails"
import { createGetCartTool } from "./getCart"
import { createAddToCartTool } from "./addToCart"
import { createUpdateCartItemQuantityTool } from "./updateCartItemQuantity"
import { createRemoveFromCartTool } from "./removeFromCart"
import { createClearCartTool } from "./clearCart"
import { createCheckoutTool } from "./checkout"

export const buildWebMCPTools = (stateRef) => [
  createSearchProductsTool(stateRef),
  createGetProductDetailsTool(stateRef),
  createGetCartTool(stateRef),
  createAddToCartTool(stateRef),
  createUpdateCartItemQuantityTool(stateRef),
  createRemoveFromCartTool(stateRef),
  createClearCartTool(stateRef),
  createCheckoutTool(stateRef),
]
