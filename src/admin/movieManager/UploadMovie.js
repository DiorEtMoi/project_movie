import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { roleContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";

function UploadMovie() {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const dispatch = useDispatch();
  const hanleAddAChap = async () => {
    try {
      dispatch(isLoading());
      const url = "api/chap_anime/create";
      const res = await axios.post(url, {
        name,
        video: link,
        anime: slug,
      });
      console.log(res?.data);
      dispatch(isSuccess());
      toast.success("Create a chapter success");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  return (
    <div className="upload_video">
      <div className="create_movie_header">
        <h3>Upload Chapter</h3>
      </div>
      <div className="create_movie_body">
        <div className="create_movie_body_name">
          <span>Name: </span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div
          className="create_movie_body_name"
          style={{
            marginTop: "4rem",
          }}
        >
          <span>Link: </span>
          <input
            type="text"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div>
      </div>
      <div className="footer_create">
        <button onClick={hanleAddAChap}>Create</button>
      </div>
    </div>
  );
}

export default UploadMovie;
