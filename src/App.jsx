import { Navbar, Footer } from "./components"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import ReactGA from "react-ga4"
import {
  Cart,
  Home,
  Checkout,
  Completion,
  Error,
  Features,
  News,
  Products,
  Services,
  SingleProduct,
  ProtectedRoute,
} from "./pages"

const measurementID = "G-Y1EV1Q38PH"

ReactGA.initialize(measurementID)
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              {" "}
              <Checkout />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/completion"
          element={
            <ProtectedRoute>
              {" "}
              <Completion />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/features" element={<Features />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
