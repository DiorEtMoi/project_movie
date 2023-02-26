import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../pagingnation/Pagination";
import MovieCardMain from "./MovieCardMain";
import "./style.scss";

function MovieHome({ item, totalPage, page, setPage }) {
  return (
    <div className="movie_home_wrap">
      <div className="movie_home">
        {item?.map((item, index) => {
          return <MovieCardMain item={item} key={index} />;
        })}
      </div>
      <div className="paging">
        <Pagination totalPage={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default MovieHome;
