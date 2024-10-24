import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Home from "../Home";

const Register = () => {
  const [inputHandle, setInputHandle] = useState({
    name: "",
    password: "",
    email: "",
    mobileNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNameAndPassword, setShowNameAndPassword] = useState(false);
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    if (
      inputHandle.name === "" ||
      inputHandle.password === "" ||
      inputHandle.email === "" ||
      inputHandle.mobileNumber === ""
    ) {
      setShowNameAndPassword(true);
      setShowError("*All Fields are Mandatory");
      return;
    } else {
      setShowNameAndPassword(false);
    }
    localStorage.setItem("name", inputHandle.name.trim().toLowerCase());
    localStorage.setItem("password", inputHandle.password);
    localStorage.setItem("email", inputHandle.email);
    localStorage.setItem("mobileNumber", inputHandle.mobileNumber);
    setInputHandle({ name: "", password: "", email: "", mobileNumber: "" });
    navigate("/login");
  };
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Home />;
  }

  return (
    <div className="min-h-[calc(100vh-45px)] px-10 py-5 flex flex-col justify-center items-center bg-slate-200">
      <h1 className="font-[roboto] font-medium text-blue-600 opacity-90 mb-10">
        Register
      </h1>
      <div className="border border-slate-400 px-4 md:px-10 py-12 rounded-md min-w-[350px]">
        <form onSubmit={submitForm}>
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className="font-[roboto] text-sm opacity-50">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="p-2 border border-slate-400 rounded-md focus:outline-blue-600 text-[14px]"
              onChange={(e) =>
                setInputHandle({ ...inputHandle, name: e.target.value })
              }
              placeholder="john doe"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="font-[roboto] text-sm opacity-50">
              Email
            </label>
            <input
              id="name"
              type="email"
              className="p-2 border border-slate-400 rounded-md focus:outline-blue-600 text-[14px]"
              onChange={(e) =>
                setInputHandle({ ...inputHandle, email: e.target.value })
              }
              placeholder="abcd@gmail.com"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label
              htmlFor="mobile"
              className="font-[roboto] text-sm opacity-50"
            >
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              className="p-2 border border-slate-400 rounded-md focus:outline-blue-600 text-[14px]"
              onChange={(e) =>
                setInputHandle({ ...inputHandle, mobileNumber: e.target.value })
              }
              placeholder="9876543210"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-[roboto] text-sm opacity-50"
            >
              Password
            </label>
            <div className="border border-slate-400 rounded-md bg-white flex justify-between items-center focus:shadow-blue-600 hover:border-blue-600">
              <input
                id="password"
                type={!showPassword ? "password" : "text"}
                className="p-2 rounded-md w-[90%] border-none outline-none"
                onChange={(e) =>
                  setInputHandle({ ...inputHandle, password: e.target.value })
                }
                placeholder="***********"
              />
              <div
                className="w-[10%] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>
                  {!showPassword && (
                    <IoMdEyeOff size={20} className="opacity-70" />
                  )}
                </span>
                <span>
                  {showPassword && <IoMdEye size={20} className="opacity-70" />}
                </span>
              </div>
            </div>
          </div>
          <div>
            {showNameAndPassword && (
              <span className="bg-red-700">{showError}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-2 bg-blue-600 text-white mt-4 font-[roboto] rounded-md"
            >
              Register
            </button>
          </div>
        </form>
        <div onClick={() => navigate("/login")} className="cursor-pointer">
          <span className="font-[roboto] text-sm text-slate-800 opacity-65">
            User Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
