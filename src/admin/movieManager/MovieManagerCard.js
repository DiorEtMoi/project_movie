import React from "react";
import "./style.scss";
function MovieManagerCard({ item, index }) {
  console.log(index);
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
    </tr>
  );
}

export default MovieManagerCard;
