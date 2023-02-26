import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLogOut } from "../../../redux/slice/auth";
import "./style.scss";
function Header() {
  const searchRef = useRef("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(isLogOut());
    navigate("/");
    return toast.success("Logout success");
  };
  return (
    <div className="container-fluid header">
      <div className="row p-2 header_nav">
        <div className="col-3">
          <Link to="/">
            <div className="header_img">
              <img src="https://animehay.pro/themes/img/logo.png" />
            </div>
          </Link>
        </div>
        <div className="col-6 header_text">
          <input type="text" placeholder="Enter to search" ref={searchRef} />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              if (!searchRef.current.value) {
                return toast.error("Enter a name or text of a movie to search");
              }
              navigate(`/search/${searchRef.current.value}`);
              searchRef.current.value = "";
            }}
          ></i>
        </div>
        <div className="col-3">
          {!auth ? (
            <div className="row header_option">
              <div className="col">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div
                className="col login_home"
                onClick={() => navigate("/login")}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
              </div>
            </div>
          ) : (
            <div className="auth_info">
              <div className="col">
                <i
                  className="fa-solid fa-bookmark bookmark"
                  onClick={() => navigate("/mark")}
                ></i>
              </div>
              <div className="auth_info_name">{auth?.showName}</div>
              <div className="auth_info_img">
                <img src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677329485/download_gaer34.png" />
              </div>
              <div className="auth_info_btn">
                <button onClick={handleLogOut}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
