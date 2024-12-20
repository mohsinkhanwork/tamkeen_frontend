import { Link } from "react-router-dom";
import { useState } from "react";
import { useAtom } from "jotai";
import logo from "../assets/TamkeenLogo.svg";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { authAtom } from "../atoms/authAtom"; // Import the atom
import { MdOutlineAccountCircle } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authState] = useAtom(authAtom);
  const nav = [
    { label: "Home", route: "/" },
    { label: "Categories", route: "/categories" },
    { label: "Contact", route: "/contact" },
    { label: "Stores", route: "/stores" },
  ];

  return (
    <section className="fixed w-full z-50 bg-white flex justify-center">
      <div className="items-center container flex gap-4 md:px-20 p-6 w-full justify-between">
        {/* Logo */}
        <Link className="w-20" to="/">
          <img src={logo} alt="Tamkeen Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="gap-8 hidden md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.route}
              className="text-gray-500 hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Search Bar */}
        <label className="input input-bordered items-center gap-2 min-w-10 md:min-w-96 max-w-[70vw] self-center hidden md:flex">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {/* Buttons and Cart */}
        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/cart" className="btn">
                <IoCartOutline size={20} />
              </Link>
              <Link to="/account" className="btn hidden sm:flex">
                <MdOutlineAccountCircle size={28} />
              </Link>
            </div>
          ) : (
            // Login and Register buttons if not signed in
            <>
              <Link
                to="/signup"
                className="btn btn-primary text-white hidden md:flex"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-primary hidden md:flex"
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 mt-0 py-4 md:hidden shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.route}
                className="text-gray-700 hover:text-primary hover:underline"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4">
              {authState.isAuthenticated ? (
                <Link
                  onClick={() => setMenuOpen(false)} // Close menu on click
                  to="/account"
                  className="btn"
                >
                  <MdOutlineAccountCircle size={28} />
                </Link>
              ) : (
                <>
                  <Link
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    to="/signup"
                    className="btn btn-primary text-white"
                  >
                    Register
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    to="/login"
                    className="btn btn-outline btn-primary"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </ul>
        )}
      </div>
    </section>
  );
};

export default Navbar;
