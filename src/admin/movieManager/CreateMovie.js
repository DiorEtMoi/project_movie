import React, {
  useState,
  useCallback,
  useRef,
  useContext,
  useEffect,
} from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import { roleContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";

const animatedComponents = makeAnimated();
function CreateMovie() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [totalChap, setTotalChap] = useState("");
  const [content, setContent] = useState("");
  const [imageCurrent, setImageCurrent] = useState("");
  const [listType, setListType] = useState([]);
  const imageRef = useRef();
  const { cache } = useContext(roleContext);
  const dispatch = useDispatch();
  const [optionsKind, setOptionKind] = useState({});
  const [choiceType, setChoiceType] = useState();
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    if (listType) {
      const arr = listType?.map((item) => {
        return {
          label: item?.typeName,
          value: item?._id,
        };
      });
      setOptionKind([...arr]);
    }
  }, [listType]);
  // Get all type
  useEffect(() => {
    let here = true;
    const url = "api/type";
    if (cache.current[url]) {
      console.log(cache);
      return setListType(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListType(res?.data);
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
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (imageCurrent) {
      URL.revokeObjectURL(imageCurrent);
    }
    imageRef.current = acceptedFiles[0];
    setImageCurrent(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleCreate = async () => {
    if (!name || !date || !totalChap || !content) {
      return toast.error("Please enter full fields");
    }
    let image = "";
    if (imageRef.current) {
      dispatch(isLoading());
      const formData = new FormData();
      formData.append("file", imageRef.current);
      formData.append("upload_preset", "dinhhoan");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/db7xtr0t6/image/upload",
          formData
        );
        image = res?.data?.url;
      } catch (error) {
        console.log(error);
      }
    } else {
      return toast.error("please import image");
    }
    let choice = choiceType.map((item) => {
      return {
        _id: item.value,
      };
    });

    console.log({ name, content, date, totalChap, image, typeAnime: choice });
    try {
      const res = await axios.post(
        "api/anime/create",
        {
          name,
          content,
          date,
          totalChap,
          image,
          typeAnime: choice,
        },
        {
          headers: {
            token: `Bearer ${auth?.user?.token}`,
          },
        }
      );
      cache.current["api/anime"].push(res?.data);
      console.log(res?.data);
      dispatch(isSuccess());
      toast.success("Create Success");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  return (
    <div className="create_movie">
      <div className="create_movie_header">
        <h3>Create New Movie</h3>
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
        <div className="create_movie_body_choose">
          <span>Choose :</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={optionsKind}
            onChange={(choice) => setChoiceType(choice)}
          />
        </div>
        <div className="create_movie_body_name">
          <span>PublishDated: </span>
          <input
            type="text"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <div className="create_movie_body_name">
          <span>TotalChap: </span>
          <input
            type="number"
            onChange={(e) => setTotalChap(e.target.value)}
            value={totalChap}
          />
        </div>
        <div className="create_movie_body_name">
          <span>Content: </span>
          <textarea
            type="text"
            className="textArea"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <div className="create_movie_body_name mt-5">
          <span className="drop_span">Image: </span>

          <div className="drop_zone">
            <div {...getRootProps()} className="drop_zone_wrap">
              <input {...getInputProps()} />
              <i class="fa-solid fa-image"></i>
              <div>
                <img src={imageCurrent} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer_create">
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateMovie;
