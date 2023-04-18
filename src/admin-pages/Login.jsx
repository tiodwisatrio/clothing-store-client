import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      } else {
        // Generate Token and store it in local storage
        localStorage.setItem("token", JSON.stringify(response));
        navigate("/productlist");
        toast.success("Login berhasil✨", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      }
    } catch (error) {
      setError(error.response.data.error);
      toast.error("Username/Password Salah", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col w-full h-full">
        <h1 className="text-center m-5 text-2xl p-3 font-bold text-teal-600">
          Login
        </h1>
        <form className="flex flex-col justify-center w-80 md:w-96 h-full p-6 md:p-8 gap-y-6 rounded-lg bg-white shadow-xl mt-3">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[14px] mb-1 text-left">
              Username
            </label>
            <input
              required
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              // onChange={handleChange}
              onChange={(e) => setpassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="password..."
              className="placeholder:text-[13px] text-[13px] px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
            <div className="flex flex-row items-center mt-4 gap-x-1 w-full cursor-pointer" onClick={handleShowPassword}>
              {/* <span
                onClick={handleShowPassword}
                className={`${
                  showPassword
                    ? "bg-teal-500 focus:ring"
                    : "bg-transparent focus:ring-0 border border-teal-600"
                } w-3 h-3 rounded-sm`}
              ></span>
              <p className="text-[12px] text-slate-500">show password</p> */}

              <input
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword}
                className={`${showPassword ? "bg-teal-500" : "bg-transparent"}`}
              />
              <span className="text-[12px] text-slate-500">show password</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-teal-600 px-3 py-2 text-[14px] text-white font-semibold rounded cursor-pointer hover:bg-teal-700 transition-all"
          >
            Login
          </button>

          {/* <div className="flex items-center justify-center gap-x-1">
            <span className="text-center text-sm">Belum punya akun? </span>
            <Link to={"/register"}>
              <p className="text-sm text-teal-600 font-medium">Register</p>
            </Link>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default Login;
