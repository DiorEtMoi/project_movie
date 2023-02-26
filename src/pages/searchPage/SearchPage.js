import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { roleContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import MovieHome from "../MovieHome/MovieHome";
import "./style.scss";
function SearchPage() {
  const [listSearch, setListSearch] = useState([]);
  const dispatch = useDispatch();
  const { cache } = useContext(roleContext);
  const { slug } = useParams();
  useEffect(() => {
    let here = true;
    const url = `api/anime/search?name=${slug}`;
    if (cache.current[url]) {
      console.log(cache);
      return setListSearch(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListSearch(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [slug]);
  return (
    <div className="search_page">
      <div className="title_search">
        <div className="title_new_search">
          <h3>Tìm Kiếm Phim</h3>
        </div>
        <div
          style={{
            backgroundColor: "#404040",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "1rem",
          }}
          className="title_search_contain"
        >
          <MovieHome item={listSearch} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
