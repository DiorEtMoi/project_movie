import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleContext } from "../App";
import "./style.scss";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import MarkCard from "./MarkCard";
import { toast } from "react-toastify";

function MarkAnime() {
  const [listMark, setListMark] = useState([]);
  const dispatch = useDispatch();
  const { cache } = useContext(roleContext);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    let here = true;
    const url = `api/mark?_id=${auth?.user?._id}`;
    if (cache.current[url]) {
      console.log(cache);
      return setListMark(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListMark(res?.data?.loveAnime);
        console.log(res?.data);
        cache.current[url] = res?.data?.loveAnime;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [auth?.user]);
  const handleDelete = async (item) => {
    try {
      dispatch(isLoading());
      await axios.post("/api/mark_delete", {
        _id: auth?.user?._id,
        animeID: item?._id,
      });
      dispatch(isSuccess());
      const newArr = listMark.filter((ite) => ite._id !== item?._id);
      setListMark([...newArr]);
      cache.current[`api/mark?_id=${auth?.user?._id}`] = [...newArr];
      return toast.success(`Bạn đã xóa phim ${item?.name} ra khỏi markstore`);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="search_page">
      <div className="title_search mt-5">
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
          <div className="movie_home_wrap">
            <div className="movie_home">
              {listMark?.map((item, index) => {
                return (
                  <div key={index} className="anime_mark">
                    <MarkCard item={item} />
                    <button
                      className="btn btn-light"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAnime;
