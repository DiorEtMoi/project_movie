import React, { useContext, useEffect, useState } from "react";
import MovieCardMain from "./MovieCardMain";
import "./style.scss";

function MovieHome({ item }) {
  return (
    <div className="movie_home_wrap">
      <div className="movie_home">
        {item?.map((item, index) => {
          return <MovieCardMain item={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default MovieHome;
