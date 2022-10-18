import React from "react"
import Image1 from "../assets/Blog1.jpg"
import Image2 from "../assets/Blog2.jpg"
import Image3 from "../assets/Blog3.jpg"
import { BsTelephone, BsBuilding } from "react-icons/bs"
import {
  AiOutlineFacebook,
  AiFillTwitterSquare,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai"
import { FiMail } from "react-icons/fi"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="container mx-auto mt-36 grid grid-cols-1 space-y-10 bg-[#48c4a0] px-5 py-8 tracking-wider text-white md:grid-cols-4 md:space-y-0 xl:px-28 xl:py-20">
        {/* Logo title */}
        <div className="space-y-6">
          <Link to="/">
            <h1 className="text-4xl font-black tracking-wider">Shoptik.</h1>
          </Link>
          <p className="w-2/3 text-sm font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim,
            voluptas!
          </p>
        </div>

        {/* Contact US */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h5 className="uppercase ">Contact us</h5>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="space-y-4 text-sm font-light">
            <p className="flex items-center space-x-1">
              <span>
                {" "}
                <BsTelephone />{" "}
              </span>
              <span> (+88) 1234 567898</span>
            </p>
            <p className="flex items-center space-x-1">
              <span>
                {" "}
                <FiMail />{" "}
              </span>
              <span> shopink@gmail.com</span>
            </p>
            <p className="flex items-center space-x-1">
              <span>
                {" "}
                <BsBuilding />{" "}
              </span>
              <span> 469, Hog Camp Road, California</span>
            </p>
            <div className="flex space-x-6">
              <AiOutlineFacebook className="h-5 w-5" />
              <AiFillTwitterSquare className="h-5 w-5" />
              <AiOutlineLinkedin className="h-5 w-5" />
              <AiOutlineInstagram className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h5 className="uppercase ">Useful links</h5>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="flex flex-col space-y-1 text-sm font-light">
            <a href="#">About Shopnik</a>
            <a href="#">Contact us</a>
            <a href="#">FAQ</a>
            <a href="#">Supports</a>
            <a href="#">Blog</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        {/* LATEST NEWS BLOG SECTION */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h5 className="uppercase ">Latest news</h5>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="flex flex-col space-y-3 font-light">
            {/* 1 */}
            <div className="flex items-center justify-center space-x-4 ">
              <img
                src={Image1}
                alt=""
                className="h-12 w-20 object-cover object-center"
              />
              <div className="space-y-1">
                <h2>Furniture Decoration idea</h2>
                <p className="text-xs text-gray-200">October 20, 2014</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={Image2}
                alt=""
                className="h-12 w-20 object-cover object-center"
              />
              <div className="space-y-1">
                <h2>Furniture Decoration idea</h2>
                <p className="text-xs text-gray-200">October 20, 2014</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={Image3}
                alt=""
                className="h-12 w-20 object-cover object-center"
              />
              <div className="space-y-1">
                <h2>Furniture Decoration idea</h2>
                <p className="text-xs text-gray-200">October 20, 2014</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
