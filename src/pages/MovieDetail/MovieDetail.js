import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { roleContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import Rating from "../../rating/Rating";
function MovieDetail() {
  const { cache } = useContext(roleContext);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [anime, setAnime] = useState();
  const [listChap, setListChap] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState("Chưa Hoàn Thành");
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    if (anime) {
      if (anime?.totalChap === anime?.chapAnime.length.toString()) {
        setStatus("Hoàn Thành");
      }
    }
  }, [anime]);
  useEffect(() => {
    let here = true;
    const url = `api/anime/anime_detail/${slug}`;
    if (cache.current[url]) {
      console.log(cache);
      setListChap(cache?.current[url].chapAnime);
      window.document.title = `Đang xem ${cache?.current[url]?.name}`;

      return setAnime(cache?.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListChap(res?.data?.chapAnime);
        setAnime(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        window.document.title = `Đang xem ${res?.data?.name}`;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [slug.slug]);
  const handleChooseChap = (item) => {
    navigate(`/movie/watch/${item}`);
  };
  return (
    <div className="movie_detail">
      <div className="movie_detail_header">
        <div className="movie_detail_header_top">
          <h3>{anime?.name}</h3>
        </div>
        <div className="movie_detail_header_content">
          <div className="movie_detail_header_content_left">
            <img src={anime?.image} />
          </div>
          <div className="movie_detail_header_content_right">
            <div className="movie_type">
              <span>Thể loại</span>
              <ul className="movie_type_list">
                {anime?.typeAnime?.map((ite, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(`/type/${ite?._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {ite?.typeName}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="movie_status">
              <span>Trạng Thái</span>
              <div>{status}</div>
            </div>
            <div className="movie_date">
              <span>Ngày ra mắt</span>
              <div>2023</div>
            </div>
            <div className="movie_chap">
              <span>Thời lượng</span>
              <div>{anime?.totalChap} tập</div>
            </div>
            <div className="movie_date">
              <span>Đánh giá</span>
              <div>{anime?.totalRate}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="movie_detail_body">
        <div className="movie_detail_body_left">
          <div className="movie_detail_body_left_header">Danh sách tập</div>
          <div className="movie_detail_body_left_list">
            {listChap.map((item, index) => {
              return (
                <div
                  className="movie_detail_body_left_list_item"
                  onClick={() => handleChooseChap(item)}
                  key={index}
                >
                  <span>{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="movie_detail_body_right">
          <Rating _id={anime?._id} />
          <div className="movie_detail_body_right_header">Nội dung</div>
          <div className="movie_detail_body_right_content">
            <p>{anime?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
