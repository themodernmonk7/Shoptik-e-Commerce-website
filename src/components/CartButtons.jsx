import React from "react"
import { BsHandbag } from "react-icons/bs"
import { AiOutlineUserAdd } from "react-icons/ai"
import { Link } from "react-router-dom"

const CartButtons = () => {
  return (
    <div className=" flex space-x-6 md:space-x-8">
      <Link to="/cart">
        <a href="#" className="relative lg:flex">
          <BsHandbag className="relative ml-1 h-6 w-6" />{" "}
          <span className="absolute -top-4 -right-3 rounded-full bg-[#48c4a0] px-2 text-white">
            {" "}
            5{" "}
          </span>{" "}
        </a>
      </Link>
      <div className="flex flex-col-reverse items-center justify-center md:flex-row">
        <button className="">
          <span>
            <AiOutlineUserAdd className="h-6 w-6" />
          </span>{" "}
        </button>
      </div>
    </div>
  )
}

export default CartButtons
