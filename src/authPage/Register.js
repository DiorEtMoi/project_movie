import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
function Register() {
  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState("");
  const [showName, setShowName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanleRegister = async () => {
    if (!password || !userName || !showName) {
      return toast.error("Please sign all fields");
    }
    if (password.length <= 8) {
      return toast.error("Enter password more than 8 characters");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("api/register", {
        userName,
        password,
        showName,
      });
      dispatch(isSuccess());
      toast.success("Create account success");
      return navigate("/login");
    } catch (error) {
      dispatch(isFailing());
      console.log(error);
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="login_page">
      <div className="login_page_wrap">
        <div className="login_page_wrap_header">
          <h3>Register</h3>
        </div>
        <div className="login_page_wrap_body">
          <div className="login_page_wrap_body_input">
            <input
              type="text"
              placeholder="Show Name"
              onChange={(e) => {
                return setShowName(e.target.value);
              }}
            />
          </div>
          <div className="login_page_wrap_body_input">
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => {
                return setUserName(e.target.value);
              }}
            />
          </div>
          <div className="login_page_wrap_body_input">
            <input
              type={show ? "password" : "text"}
              placeholder="Enter Password "
              onChange={(e) => {
                return setPassword(e.target.value);
              }}
            />
          </div>
          <div className="login_show">
            <div>
              {" "}
              <input type="checkbox" onChange={() => setShow(!show)} />
              <span>Show</span>
            </div>
            <Link to="/login">
              <div
                style={{
                  color: "#000",
                }}
              >
                Login ?
              </div>
            </Link>
          </div>
          <div className="login_page_wrap_body_submit">
            <button className="btn_login" onClick={hanleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
