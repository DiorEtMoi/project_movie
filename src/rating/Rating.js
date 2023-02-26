import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { roleContext } from "../App";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import "./style.scss";
function Rating({ _id }) {
  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);
  const starArr = Array(10).fill(0);
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const { cache } = useContext(roleContext);
  const [open, setOpen] = useState(false);
  const handleRating = async (index) => {
    setStar(index);
    if (!auth.user) {
      setStar(0);
      return toast.error("you must be login to rating for movie");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/anime/rating", {
        _id: auth?.user?._id,
        animeID: _id,
        rate: index,
      });
      console.log({
        _id: auth?.user?._id,
        animeID: _id,
        rate: index,
      });
      cache.current[`api/anime/rating?_id=${auth?.user?._id}&animeID=${_id}`] =
        res?.data[0].rate;
      dispatch(isSuccess());
      return toast.success("Rating success");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  const handleGetRate = async () => {
    setOpen(!open);
    if (!open) {
      console.log(open);
      if (auth.user) {
        if (
          cache.current[
            `/api/anime/rating?_id=${auth?.user?._id}&animeID=${_id}`
          ]
        ) {
          return setStar(
            cache.current[
              `/api/anime/rating?_id=${auth?.user?._id}&animeID=${_id}`
            ]
          );
        }
        try {
          dispatch(isLoading());
          const res = await axios.get(
            `/api/anime/rating?_id=${auth?.user?._id}&animeID=${_id}`
          );
          setStar(res?.data[0]?.rate);
          cache.current[
            `/api/anime/rating?_id=${auth?.user?._id}&animeID=${_id}`
          ] = res?.data[0]?.rate;
          return dispatch(isSuccess());
        } catch (error) {
          dispatch(isFailing());
          return toast.success(error?.response?.data);
        }
      }
      return;
    }
  };
  const handleMark = async () => {
    if (!auth.user) {
      return toast.warning("You must be login to marks");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/mark", {
        _id: auth?.user?._id,
        animeID: _id,
      });
      cache.current[`api/mark?_id=${auth?.user?._id}`] =
        res?.data?.loveAnime?.loveAnime;
      dispatch(isSuccess());
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="rating">
      <div
        style={{
          alignItems: "center",
        }}
      >
        <div className="rating_header">Đánh giá</div>
        {open && (
          <div className="rating_body">
            {starArr.map((item, index) => {
              return (
                <i
                  onMouseOver={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleRating(index + 1)}
                  className={
                    hover
                      ? hover > index
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                      : star > index
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                  key={index}
                ></i>
              );
            })}
          </div>
        )}
        <button
          className="btn btn-light"
          style={{
            marginLeft: "10px",
          }}
          onClick={handleGetRate}
        >
          Show
        </button>
      </div>
      <div className="bookmarks" onClick={handleMark}>
        <i class="fa-solid fa-bookmark"></i>
      </div>
    </div>
  );
}

export default Rating;
