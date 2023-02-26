import React, { useContext, useEffect, useState } from "react";
import Swiper from "../../Swiper/Swiper";
import MovieHome from "../MovieHome/MovieHome";
import "./style.scss";
import { roleContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Home() {
  const [listAnime, setListAnime] = useState([]);
  const { cache } = useContext(roleContext);
  const [listSwiper, setListSwiper] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    let here = true;
    const url = "api/anime/swiper";
    if (cache.current[url]) {
      console.log(cache);
      return setListSwiper(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListSwiper(res?.data);
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
  }, []);
  useEffect(() => {
    let here = true;
    const url = `api/anime/home?page=${page}`;
    if (cache.current[url]) {
      console.log(cache);
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
        setPage(res?.data?.page);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
        toast.error(err?.response?.data);
        return navigate("/");
      });
    return () => {
      here = false;
    };
  }, [page]);
  return (
    <div className="container-fluid home_nav">
      <div className=" home_nav_title">
        <div className="col-2">
          <h3>Phim đề cử</h3>
        </div>
      </div>
      <div className="header_swiper">
        <Swiper item={listSwiper} />
      </div>
      <div className="home_nav_title_new mt-3 ms-3">
        <div className="row space-between title_home">
          <div className="col-2 title_new">
            <h3
              style={{
                color: "#a7a7a7",
                margin: "0",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              Phim đề cử
            </h3>
          </div>
          <div className="col-2 d-flex jusify-content-center align-items-center">
            <span className="option_anime">Anime</span>
            <span className="option_anime">CNA</span>
          </div>
        </div>
      </div>
      <MovieHome
        item={listAnime?.animes}
        totalPage={listAnime?.totalPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default Home;
