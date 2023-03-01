import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { roleContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import MovieHome from "../MovieHome/MovieHome";

function TypeAnime() {
  const { slug } = useParams();
  const { cache } = useContext(roleContext);
  const [listAnime, setListAnime] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    let here = true;
    const url = `api/type/anime_type?_id=${slug}&page=${page}`;
    if (cache.current[url]) {
      console.log(cache);
      window.document.title = `Thể loại : ${cache?.current[url]?.typeName?.typeName}`;
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
        console.log(res?.data);
        window.document.title = `Thể loại : ${res?.data?.typeName?.typeName}`;

        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [page, slug]);
  return (
    <div className="search_page">
      <div className="title_search">
        <div className="title_new_search">
          <h3>Thể Loại : {listAnime?.typeName?.typeName}</h3>
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
          <MovieHome
            item={listAnime?.animes}
            totalPage={listAnime?.totalPage}
            page={listAnime?.page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default TypeAnime;
