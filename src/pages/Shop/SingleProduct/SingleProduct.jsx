import React from "react"

import { single_product_url as url } from "../../../utils/constants"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

import {
  AddToCart,
  Error,
  Loading,
  ProductImages,
  Breadcrumb,
  Stars,
} from "../../../components"
import { formatPrice, trackGAEvent } from "../../../utils/helper"
import { useProductsContext } from "../../../context/product/products_context"

const SingleProduct = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext()
  const { id } = useParams()

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (product) {
      trackGAEvent({
        event: "view_item",
        ecommerce: {
          currency: "INR",
          value: product?.price,
          items: [
            {
              item_name: product?.name,
              item_id: product?.id,
              price: product?.price,
            },
          ],
        },
      })
    }
  }, [product])

  if (loading) return <Loading />
  if (error) return <Error />

  const { name, description, images, price, reviews, stars, stock } = product
  return (
    <>
      <Breadcrumb title={name} product />
      <div className="container mx-auto my-10 grid gap-16 px-5 md:grid-cols-2 xl:my-32 xl:px-28  ">
        <ProductImages product={product} images={images} />

        <div className="">
          <section className=" flex flex-col justify-between  space-y-6  ">
            <div>
              {stock > 0 ? (
                <span className="  rounded border border-green-500 px-4 py-2 text-center text-xs font-medium capitalize text-green-500 ">
                  In stock
                </span>
              ) : (
                <span className="  rounded border  border-red-300 px-4 py-2 text-xs font-medium capitalize text-red-300 ">
                  Out of stock
                </span>
              )}
            </div>
            <div className="flex flex-col  items-start space-y-2">
              <h4 className="text-3xl font-medium"> {name} </h4>
              <Stars stars={stars} reviews={reviews} />
            </div>

            <p className="font-light text-gray-500">{description}</p>

            <div className="space-y-4">
              <h5 className="text-2xl font-bold">{formatPrice(price)}</h5>
            </div>
            {stock >= 1 && <AddToCart product={product} />}
            <div className=" pt-8 ">
              <hr />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
