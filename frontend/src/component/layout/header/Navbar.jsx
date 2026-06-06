import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BsSearch, BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-[100%] h-[70px] flex justify-between items-center bg-[#edecec] text-black border-white-0 z-20 top-0 ">
      <div className="">
        <img src={Logo} alt="LazyCart logo" className="w-[160px]" />
      </div>

      {/* menu */}
      <ul className="hidden md:flex mx-4">
        <li className="mx-10 text-xl font-roboto hover:translate-y-[-1px]">
          <Link to="/" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="mx-10 text-xl font-roboto hover:translate-y-[-1px]">
          <Link to="/products" smooth={true} duration={500}>
            Product
          </Link>
        </li>
        <li className="mx-10 text-xl font-roboto hover:translate-y-[-1px]">
          <Link to="/Contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
        <li className="mx-10 text-xl font-roboto hover:translate-y-[-1px]">
          <Link to="/About" smooth={true} duration={500}>
            About
          </Link>
        </li>
      </ul>
      <div className="justify-between right-0">
        <ul className="hidden md:flex mx-4">
          <li className="mx-5">
            <Link to="/search" smooth={true} duration={500}>
              <BsSearch size={25} className="hover:translate-y-[-1px]" />
            </Link>
          </li>
          <li className="mx-5">
            <Link to="/cart" smooth={true} duration={500}>
              <BsCart2 size={25} className="hover:translate-y-[-1px]" />
            </Link>
          </li>
          <li className="mx-5">
            <Link to="/login" smooth={true} duration={500}>
              <CgProfile size={25} className="hover:translate-y-[-1px]" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10 mr-[12px]">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute top-0 left-0 w-full h-screen bg-[#edecec] text-black flex flex-col justify-center items-center transition-smooth'
        }
      >
        <li className="py-3 text-3xl">
          <Link onClick={handleClick} to="/" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-3 text-3xl">
          {' '}
          <Link
            onClick={handleClick}
            to="/products"
            smooth={true}
            duration={500}
          >
            Product
          </Link>
        </li>
        <li className="py-3 text-3xl">
          {' '}
          <Link
            onClick={handleClick}
            to="/contact"
            smooth={true}
            duration={500}
          >
            Contact
          </Link>
        </li>
        <li className="py-3 text-3xl">
          {' '}
          <Link onClick={handleClick} to="/about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className="mx-5 py-3">
          <Link onClick={handleClick} to="/search" smooth={true} duration={500}>
            <BsSearch size={40} className="hover:translate-y-[-1px]" />
          </Link>
        </li>
        <li className="mx-5 py-3">
          <Link onClick={handleClick} to="/cart" smooth={true} duration={500}>
            <BsCart2 size={40} className="hover:translate-y-[-1px]" />
          </Link>
        </li>
        <li className="mx-5 py-3">
          <Link onClick={handleClick} to="/login" smooth={true} duration={500}>
            <CgProfile size={40} className="hover:translate-y-[-1px]" />
          </Link>
        </li>
      </ul>

      {/* Social icons */}
      {/* <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
