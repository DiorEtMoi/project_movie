import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roleContext } from "../../../App";
import {
  isFailing,
  isLoading,
  isLogOut,
  isSuccess,
} from "../../../redux/slice/auth";
import "./style.scss";
function Header() {
  const searchRef = useRef("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const [type, setType] = useState([]);
  const { cache, store } = useContext(roleContext);
  const [open, setOpen] = useState(false);
  const handleLogOut = () => {
    dispatch(isLogOut());
    navigate("/");
    return toast.success("Logout success");
  };
  useEffect(() => {
    let here = true;
    const url = "api/type";
    if (cache.current[url]) {
      console.log(cache);
      return setType(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setType(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  const handleFindAnimeType = (id) => {
    navigate(`/type/${id}`);
    setOpen(false);
  };
  const handleGotoAdmin = () => {
    if (store.role === "role_Admin") {
      navigate("/admin/movie_manager");
    }
  };
  return (
    <div className="container-fluid header">
      <div className="row p-2 header_nav">
        <div className="col-3">
          <div className="row">
            <Link to="/" className="col">
              <div className="header_img">
                <img src="https://animehay.pro/themes/img/logo.png" />
              </div>
            </Link>
            <div
              className="col-sm-2 col-12 menu p-sm-0 p-1 mt-2"
              onClick={() => setOpen(!open)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
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
              <div className="auth_info_img" onClick={handleGotoAdmin}>
                <img src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677329485/download_gaer34.png" />
              </div>
              <div className="auth_info_btn">
                <button onClick={handleLogOut}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="modal_menu">
          <div className="modal_menu_content">
            {type?.map((item, index) => {
              return (
                <div
                  className="modal_menu_content_item"
                  key={index}
                  onClick={() => handleFindAnimeType(item?._id)}
                >
                  {item?.typeName}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
