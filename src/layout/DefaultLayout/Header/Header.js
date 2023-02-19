import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
function Header() {
  const [search, setSearch] = useState("");
  return (
    <div className="container-fluid header">
      <div className="row p-2">
        <div className="col-3">
          <Link to="/">
            <div className="header_img">
              <img src="https://animehay.pro/themes/img/logo.png" />
            </div>
          </Link>
        </div>
        <div className="col-6 header_text">
          <input
            type="text"
            placeholder="Enter to search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="col-3">
          <div className="row header_option">
            <div className="col">
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className="col">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div className="col">
              <i className="fa-solid fa-bookmark"></i>
            </div>
            <div className="col">
              <i className="fa-solid fa-right-to-bracket"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
