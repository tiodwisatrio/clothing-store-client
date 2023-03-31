import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const submitRegister = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/register", inputs);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };
  };
  return (
    <>
      <>
        <Navbar />
        <div className="flex items-center justify-center flex-col w-full h-full">
          <h1 className="text-center m-6 text-2xl p-3 font-bold text-teal-600">
            Register
          </h1>
          <form className="flex flex-col justify-center w-80 md:w-96 h-full p-6 md:p-8 gap-y-6 rounded-lg bg-white shadow-xl mt-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[14px] mb-1 text-left">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="off"
                placeholder="your email..."
                className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-[14px] mb-1 text-left">
                Username
              </label>
              <input
                required
                name="username"
                onChange={handleChange}
                type="text"
                autoComplete="off"
                placeholder="username..."
                className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-[14px] mb-1 text-left">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="off"
                placeholder="password..."
                className="placeholder:text-[13px] text-[13px] px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
            <button className="mt-4 bg-teal-600 px-3 py-2 text-[14px] text-white font-semibold rounded cursor-pointer hover:bg-teal-700 transition-all">
              Register
            </button>

            <div className="flex items-center justify-center gap-x-1">
              <span className="text-center text-sm">Sudah punya akun? </span>
              <Link to={"/login"}>
                <p className="text-sm text-teal-600 font-medium">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default Register;
