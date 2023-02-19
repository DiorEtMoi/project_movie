import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function MovieCardMain() {
  return (
    <div className="movie_card_main_wrap">
      <Link to="/movie/asd">
        <div className="movie_card_main">
          <div className="movie_card_main_top">
            <img src="https://animehay.pro/upload/poster/3518-1659146047.jpg" />
          </div>
          <span className="movie_card_main_chap">1/10</span>
          <span className="movie_card_main_rate">10</span>
          <div className="movie_card_main_footer">
            <h3>Đấu Phá Thương Khung</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCardMain;
