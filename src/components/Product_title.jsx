import React from "react"
import { Link } from "react-router-dom"
import { formatPrice } from "../utils/helper"

const Product_title = ({ product }) => {
  const { name, price, id } = product
  return (
    <>
      <div className="">
        <Link
          to={`/shop/${id}`}
          className="text-gray-500 font-light capitalize transition-all duration-100 ease-linear group-hover:text-primary "
        >
          {" "}
          {name}
        </Link>
        <p className="font-semibold"> {formatPrice(price)} </p>
      </div>
    </>
  )
}

export default Product_title
