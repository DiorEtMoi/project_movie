import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { roleContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";

function TypeManager() {
  const [name, setName] = useState("");
  const { cache } = useContext(roleContext);
  const dispatch = useDispatch();
  const handleCreateNewType = async () => {
    try {
      dispatch(isLoading());
      const url = "api/type";
      const res = await axios.post(url, {
        typeName: name,
      });
      cache.current[url].push(res?.data);
      dispatch(isSuccess());
      return toast.success("Create type success");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="create_movie">
      <div className="create_movie_header">
        <h3>Create New Type</h3>
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
      </div>
      <div className="footer_create">
        <button onClick={handleCreateNewType}>Create</button>
      </div>
    </div>
  );
}

export default TypeManager;
