import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import MovieManagerCard from "./MovieManagerCard";
import { roleContext } from "../../App";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Pagination from "../../pagingnation/Pagination";

function MovieManager() {
  const [listAnime, setListAnime] = useState([]);
  const { cache } = useContext(roleContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState();
  const handleCreateMovie = () => {
    navigate("/admin/create_movie");
  };
  const handleFind = async () => {
    try {
      dispatch(isLoading());
      const res = await axios.get(`/api/anime/search?name=${search}`);
      setListAnime(res?.data);
      console.log(res);
      dispatch(isSuccess());
    } catch (error) {
      dispatch(isFailing());
    }
  };
  useEffect(() => {
    if (!search) {
      let here = true;
      const url = `api/anime/home?page=${page}`;
      if (cache.current[url]) {
        console.log(cache);
        setPage(cache.current[url]?.page);
        setTotal(cache.current[url]?.totalPage);
        return setListAnime(cache.current[url]?.animes);
      }
      dispatch(isLoading());
      axios
        .get(url)
        .then((res) => {
          if (!here) {
            return;
          }
          setListAnime(res?.data?.animes);
          setPage(res?.data?.page);
          setTotal(res?.data?.totalPage);
          console.log(res?.data);
          cache.current[url] = res?.data;
          dispatch(isSuccess());
        })
        .catch((err) => {
          dispatch(isFailing());
          toast.error(err?.response?.data);
        });
      return () => {
        here = false;
      };
    }
  }, [page]);
  return (
    <div className="movie_table">
      <div className="movie_table_header">
        <h3>Movie</h3>
        <div>
          <button onClick={handleCreateMovie}> New Movie</button>
          <div className="search">
            <input onChange={(e) => setSearch(e.target.value)} value={search} />
            <i class="fa-solid fa-magnifying-glass" onClick={handleFind}></i>
          </div>
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
        <div className="paging" style={{ marginBottom: "1rem" }}>
          <Pagination totalPage={total} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default MovieManager;
