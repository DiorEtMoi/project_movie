import React from "react";
import { useNavigate } from "react-router";

function MarkCard({ item }) {
  const navigate = useNavigate();
  const hanleClickCard = () => {
    navigate(`/movie/${item._id}`);
  };

  return (
    <div className="mark_movie" onClick={hanleClickCard}>
      <div className="mark_movie_main">
        <div className="mark_movie_main_top">
          <img src={item?.image} />
        </div>
        <span className="mark_movie_main_chap">
          {item?.chapAnime.length} / {item?.totalChap}
        </span>
        <span className="mark_movie_main_rate">{item?.totalRate}</span>
        <div className="mark_movie_main_footer">
          <h3>{item.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default MarkCard;
