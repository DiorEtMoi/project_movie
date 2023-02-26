import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isLogin, isSuccess } from "../redux/slice/auth";
import "./style.scss";
function Login() {
  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!userName || !password) {
      return toast.error("Enter full fields");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/login", {
        userName,
        password,
      });
      dispatch(isLogin(res?.data));
      console.log(res);
      toast.success("Login success");
      return navigate("/");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="login_page">
      <div className="login_page_wrap">
        <div className="login_page_wrap_header">
          <h3>Login</h3>
        </div>
        <div className="login_page_wrap_body">
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
              placeholder="Enter Password"
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
            <Link to="/register">
              <div
                style={{
                  color: "#000",
                }}
              >
                Register ?
              </div>
            </Link>
          </div>
          <div className="login_page_wrap_body_submit">
            <button className="btn_login" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
