import React from "react";
import "./style.scss";
const Pagination = ({ totalPage, page, setPage }) => {
  const handleNext = (index) => {
    setPage(index);
  };
  return (
    <div className="pagination">
      <button
        className="btn btn-light"
        style={{
          marginRight: "10px",
        }}
        onClick={() => handleNext(page - 1)}
        disabled={page <= 1}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        className="btn btn-light"
        onClick={() => handleNext(page + 1)}
        disabled={page >= totalPage}
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
