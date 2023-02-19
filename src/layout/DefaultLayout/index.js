import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./style.scss";
function DefaultLayout({ children }) {
  return (
    <div className="container">
      <Header />
      <div>
        <div>{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DefaultLayout;
