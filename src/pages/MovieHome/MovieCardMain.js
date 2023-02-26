import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

function MovieCardMain({ item, key }) {
  const navigate = useNavigate();
  const hanleClickCard = () => {
    navigate(`/movie/${item._id}`);
  };
  return (
    <div className="movie_card_main_wrap" key={key} onClick={hanleClickCard}>
      <div className="movie_card_main">
        <div className="movie_card_main_top">
          <img src={item?.image} />
        </div>
        <span className="movie_card_main_chap">
          {item?.chapAnime.length} / {item?.totalChap}
        </span>
        <span className="movie_card_main_rate">{item?.totalRate}</span>
        <div className="movie_card_main_footer">
          <h3>{item.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default MovieCardMain;
