import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useCartContext } from "../context/cart/cart_context"
import { useProductsContext } from "../context/product/products_context"
import { registerWebMCPTools } from "./registerWebMCPTools"

const WebMCPTools = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  const cart = useCartContext()
  const products = useProductsContext()

  const stateRef = useRef({})
  stateRef.current = { navigate, isAuthenticated, cart, products }

  useEffect(() => registerWebMCPTools(stateRef), [])

  return null
}

export default WebMCPTools
