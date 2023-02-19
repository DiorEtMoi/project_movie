import React from "react";
import Swiper from "../../Swiper/Swiper";
import MovieHome from "../MovieHome/MovieHome";
import "./style.scss";

function Home() {
  return (
    <div className="container-fluid home_nav">
      <div className=" home_nav_title">
        <div className="col-2">
          <h3>Phim đề cử</h3>
        </div>
      </div>
      <div className="header_swiper">
        <Swiper />
      </div>
      <div className="home_nav_title_new mt-3 ms-3">
        <div className="row space-between">
          <div className="col-2 title_new">
            <h3
              style={{
                color: "#a7a7a7",
                margin: "0",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              Phim đề cử
            </h3>
          </div>
          <div className="col-2 d-flex jusify-content-center align-items-center">
            <span className="option_anime">Anime</span>
            <span className="option_anime">CNA</span>
          </div>
        </div>
      </div>
      <MovieHome />
    </div>
  );
}

export default Home;
