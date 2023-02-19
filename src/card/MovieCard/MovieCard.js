import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
function MovieCard() {
  return (
    <div className="movie_card_wrap">
      <Link to="/movie/asd">
        <div className="movie_card">
          <img src="https://animehay.pro/upload/poster/3518-1659146047.jpg" />
          <div className="movie_card_chap">
            <span>1</span>
            <span>/20</span>
          </div>
          <div className="movie_card_footer">
            <h3>Đấu Phá Thương Khung</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
