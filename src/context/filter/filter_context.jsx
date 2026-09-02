import { useReducer } from "react"
import { useContext } from "react"
import { createContext } from "react"
import { usePostHog } from "@posthog/react"
import { POSTHOG_EVENTS } from "../../analytics/posthogEvents"
import reducer from "../../reducers/filter/filter_reducer"
import {
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  UPDATE_SORT,
  UPDATE_FILTERS,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../../actions/actions"
import { useProductsContext } from "../product/products_context"
import { useEffect } from "react"

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price_lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = createContext()
export const FiltersProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  const posthog = usePostHog()

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW })
  }

  const updateSort = (e) => {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
    posthog?.capture(POSTHOG_EVENTS.PRODUCT_LIST_SORTED, { sort: value })
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === "shipping") {
      value = e.target.checked
    }
    if (name === "category") {
      value = e.target.textContent
    }
    if (name === "price") {
      value = Number(value)
    }
    if (name === "color") {
      value = e.target.dataset.color
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })

    if (name !== "text" && name !== "price") {
      posthog?.capture(POSTHOG_EVENTS.PRODUCT_FILTER_APPLIED, {
        filter_name: name,
        filter_value: value,
      })
    }
  }

  const clearFilters = (e) => {
    dispatch({ type: CLEAR_FILTERS })
    posthog?.capture(POSTHOG_EVENTS.PRODUCT_FILTERS_CLEARED)
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
