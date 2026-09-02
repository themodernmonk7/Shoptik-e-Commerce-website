import { Auth0Provider } from "@auth0/auth0-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { PostHogProvider } from "@posthog/react"
import App from "./App"
import { CartProvider } from "./context/cart/cart_context"
import { FiltersProvider } from "./context/filter/filter_context"
import { ProductsProvider } from "./context/product/products_context"
import "./index.css"

const posthogOptions = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN}
      options={posthogOptions}
    >
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
      >
        <ProductsProvider>
          <FiltersProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FiltersProvider>
        </ProductsProvider>
      </Auth0Provider>
    </PostHogProvider>
  </React.StrictMode>
)
