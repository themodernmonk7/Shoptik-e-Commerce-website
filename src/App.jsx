import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  HomePage,
  SingleProductPage,
  CartPage,
  ErrorPage,
  AboutPage,
  ProductsPage,
} from "./pages"
import { Navbar, Footer } from "./components"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<SingleProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
