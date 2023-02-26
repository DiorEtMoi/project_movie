import React from "react";
import { useNavigate } from "react-router";
import "./style.scss";
function MovieManagerCard({ item, index }) {
  const navigate = useNavigate();
  return (
    <tr className="row_card" key={index}>
      <td>{index + 1}</td>
      <td className="img_td">
        <div>
          <img src={item?.image} />
        </div>
      </td>
      <td>{item?.name}</td>
      <td>{item?.chapAnime.length}</td>
      <td>
        <div className="option">
          <button
            className="btn btn-info p-2 "
            onClick={() => {
              return navigate(`/admin/upload/${item?._id}`);
            }}
          >
            Upload
          </button>
        </div>
      </td>
    </tr>
  );
}

export default MovieManagerCard;
