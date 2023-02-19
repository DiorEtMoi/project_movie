import React from "react";
import MovieCardMain from "./MovieCardMain";
import "./style.scss";
function MovieHome() {
  return (
    <div className="movie_home_wrap">
      <div className="movie_home">
        <MovieCardMain />
        <MovieCardMain />
        <MovieCardMain />
        <MovieCardMain />
        <MovieCardMain />
      </div>
    </div>
  );
}

export default MovieHome;
