import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "../Home";

const Login = () => {
  const [inputHandle, setInputHandle] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNameAndPassword, setShowNameAndPassword] = useState(false);
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    if (inputHandle.name === "" || inputHandle.password === "") {
      setShowNameAndPassword(true);
      setShowError("*All Fields are Mandatory");
      return;
    } else {
      setShowNameAndPassword(false);
    }
    const userName = localStorage.getItem("name");
    const userPassword = localStorage.getItem("password");

    // console.log(userName);
    // console.log(userPassword);
    if (
      userName !== inputHandle.name.trim().toLowerCase() ||
      userPassword !== inputHandle.password
    ) {
      setShowNameAndPassword(true);
      setShowError("Invalid Username or Password");
      return;
    }


    Cookies.set("jwt_token", "123456789");
    setInputHandle({ name: "", password: "" });
  };
  const jwtToken = Cookies.get("jwt_token");
//   console.log(jwtToken);
  if (jwtToken !== undefined) {
    return <Home />;
  }

  return (
    <div className="min-h-[calc(100vh-45px)] px-10 py-5 flex flex-col justify-center items-center bg-slate-200">
      <h1 className="font-[roboto] font-medium text-blue-600 opacity-90 mb-10">
        Login
      </h1>
      <div className="border border-slate-400 px-4 md:px-10 py-12 rounded-md min-w-[350px]">
        <form onSubmit={submitForm}>
          <div className="flex flex-col mb-5">
            <label className="font-[roboto] text-sm opacity-50">Name</label>
            <input
              id="name"
              type="text"
              className="p-2 border border-slate-400 rounded-md focus:outline-blue-600 text-[14px]"
              onChange={(e) =>
                setInputHandle({ ...inputHandle, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="font-[roboto] text-sm opacity-50">Password</label>
            <div className="border border-slate-400 rounded-md bg-white flex justify-between items-center focus:shadow-blue-600 hover:border-blue-600">
              <input
                id="password"
                type={!showPassword ? "password" : "text"}
                className="p-2 rounded-md w-[90%] border-none outline-none"
                onChange={(e) =>
                  setInputHandle({ ...inputHandle, password: e.target.value })
                }
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
              <span className="text-red-600 font-[roboto] text-[12px]">
                {showError}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-2 bg-blue-600 text-white mt-4 font-[roboto] rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <div onClick={() => navigate("/register")} className="cursor-pointer">
          <span className="font-[roboto] text-sm text-slate-800 opacity-65">
            User Register?{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
