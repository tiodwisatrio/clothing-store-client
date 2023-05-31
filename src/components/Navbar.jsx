import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg w-full h-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-teal-700">
              GrowthStreet
            </Link>
            <button
              className="md:hidden rounded-lg focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center md:w-auto mt-4 md:mt-0`}
          >
            <div className="flex items-center justify-end gap-6 flex-col sm:flex-row sm:justify-start">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sm text-teal-700 hover:text-teal-900"
                    : "text-slate-600 text-sm hover:text-slate-900"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sm text-teal-700 hover:text-teal-900"
                    : "text-slate-600 text-sm hover:text-slate-900"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-sm text-teal-700 hover:text-teal-900"
                    : "text-slate-600 text-sm hover:text-slate-900"
                }
              >
                Contact
              </NavLink>

              <button className="bg-teal-700 rounded text-sm text-white px-7 py-2 hover:bg-teal-900">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
