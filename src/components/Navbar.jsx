import React from "react"
import { Link } from "react-router-dom"
import { links } from "../utils/constants"
import CartButtons from "./CartButtons"

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-100 py-4 xl:py-12">
        <div className="container mx-auto flex h-full items-center justify-between px-5 xl:max-w-screen-xl  xl:px-28">
          {/* Logo */}
          <Link to="/">
            <h1 className="relative flex  pr-3 text-2xl font-bold  tracking-wider md:text-3xl">
              Shoptik
            </h1>
          </Link>
          {/* Menu items */}
          <ul className="hidden space-x-10 uppercase xl:flex">
            {links.map((link) => {
              const { id, text, url } = link
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              )
            })}
          </ul>

          {/* Add cart and User  */}
          <CartButtons />
        </div>
      </nav>
    </>
  )
}

export default Navbar
