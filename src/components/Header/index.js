import React from "react";
import { MdLogout } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigator = useNavigate();
  const logoutButton = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    localStorage.removeItem("email");
    localStorage.removeItem("mobileNumber");
    navigator("/login");
  };

  return (
    <div className="flex justify-between bg-blue-200 px-10 py-5">
      <h1 className="text-md text-slate-800 font-bold font-[roboto]">
        Demo Project
      </h1>
      <div className="cursor-pointer" onClick={logoutButton}>
        <MdLogout size={22} />
      </div>
    </div>
  );
};

export default Header;
