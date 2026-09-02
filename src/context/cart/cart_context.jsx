import { createContext, useContext, useEffect, useReducer } from "react"
import { usePostHog } from "@posthog/react"
import { POSTHOG_EVENTS } from "../../analytics/posthogEvents"
import reducer from "../../reducers/cart/cart_reducer"
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../../actions/actions"
import { trackGAEvent } from "../../utils/helper"

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart")
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 99,
}

const CartContext = createContext()
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const posthog = usePostHog()

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })

    trackGAEvent({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value: amount * product.price,
        items: [
          {
            item_name: product.name,
            item_id: product.id,
            price: product.price * amount,
            quantity: amount,
          },
        ],
      },
    })

    posthog?.capture(POSTHOG_EVENTS.ADD_TO_CART, {
      product_id: product.id,
      product_name: product.name,
      color,
      quantity: amount,
      price: product.price,
      value: amount * product.price,
      currency: "INR",
    })
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } })

    posthog?.capture(POSTHOG_EVENTS.REMOVE_FROM_CART, { cart_item_id: id })
  }

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })

    posthog?.capture(POSTHOG_EVENTS.CLEAR_CART)
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
