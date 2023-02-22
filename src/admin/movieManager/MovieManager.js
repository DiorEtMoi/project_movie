import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import MovieManagerCard from "./MovieManagerCard";
import { roleContext } from "../../App";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { useNavigate } from "react-router";
function MovieManager() {
  const [listAnime, setListAnime] = useState([]);
  const { cache } = useContext(roleContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateMovie = () => {
    navigate("/admin/create_movie");
  };
  useEffect(() => {
    let here = true;
    const url = "api/anime";
    if (cache.current[url]) {
      console.log(cache.current[url]);
      return setListAnime(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListAnime(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  return (
    <div className="movie_table">
      <div className="movie_table_header">
        <h3>Movie</h3>
        <div>
          <button onClick={handleCreateMovie}> New Movie</button>
        </div>
      </div>
      <div className="manageCourse_table">
        <table className="s_table">
          <thead className="s_thead">
            <tr className="s_trow">
              <th className="u_tstt">STT</th>
              <th className="u_tuser">Avatar</th>
              <th className="u_trule">Name</th>
              <th className="u_trule">Chap Current</th>
            </tr>
          </thead>
          <tbody>
            {listAnime?.map((item, index) => {
              return <MovieManagerCard item={item} index={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MovieManager;
