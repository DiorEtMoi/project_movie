import React from "react";
import { useNavigate } from "react-router";
import "./style.scss";
function MovieCard({ ite }) {
  const navigate = useNavigate();
  return (
    <div
      className="movie_card_wrap"
      onClick={() => {
        navigate(`/movie/${ite?._id}`);
      }}
    >
      <div className="movie_card">
        <img src={ite?.image} />
        <div className="movie_card_chap">
          <span>{ite?.chapAnime.length}</span>
          <span>/{ite?.totalChap}</span>
        </div>
        <div className="movie_card_footer">
          <h3>{ite?.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
