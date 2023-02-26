import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import parse from "html-react-parser";
import "./style.scss";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { roleContext } from "../../App";
import { useDispatch } from "react-redux";

function WatchAnime() {
  const [anime, setAnime] = useState();
  const dispatch = useDispatch();
  const [chap, setChap] = useState();
  const [video, setVideo] = useState("");
  const slug = useParams();
  const navigate = useNavigate();
  const { cache } = useContext(roleContext);

  useEffect(() => {
    let here = true;
    const url = `api/chap_anime/${slug.slug}`;
    if (cache.current[url]) {
      console.log(cache);
      setChap(cache?.current[url]);
      return setAnime(cache?.current[url]?.anime);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setChap(res?.data);
        setAnime(res?.data?.anime);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [slug.slug]);
  useEffect(() => {
    setVideo(chap?.video);
  }, [chap]);
  const handleChooseAnime = (item) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/movie/watch/${item}`);
  };
  return (
    <div className="watch_anime">
      <div className="watch_anime_header">
        <div className="watch_anime_header_top">
          <i class="fa-solid fa-film"></i>
          <h3>{anime?.name}</h3>
        </div>
        <div className="watch_anime_header_bottom">
          <h3>Đang xem tập {chap?.name}</h3>
        </div>
      </div>
      <div className="watch_anime_content">
        <div className="watch_anime_content_video">
          {video ? parse(video) : ""}
        </div>
      </div>
      <div className="watch_anime_list_chap">
        <div className="watch_anime_list_chap_note">
          <div className="watch_anime_list_chap_note_header">
            <i class="fa-solid fa-note-sticky"></i>
            <span>Ghi chú</span>
          </div>
          <div className="watch_anime_list_chap_note_footer">
            <span>PHIM ĐƯỢC CẬP NHẬT KHI TUI RẢNH NHA MỌI NGƯỜI</span>
          </div>
        </div>
        <div className="watch_anime_list_chap_anime">
          <div className="watch_anime_list_chap_anime_header">
            <span>Danh sách tập</span>
          </div>
          <div className="watch_anime_list_chap_anime_content">
            {anime?.chapAnime?.map((item, index) => {
              return (
                <div
                  className={
                    chap?.name == index + 1
                      ? "watch_anime_list_chap_anime_content_item active"
                      : "watch_anime_list_chap_anime_content_item "
                  }
                  key={index}
                  onClick={() => handleChooseAnime(item)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchAnime;
