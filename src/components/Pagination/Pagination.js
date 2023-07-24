import { useEffect, useRef, useState } from "react";

export const Pagination = ({ totalPages, onPageChange }) => {
  const activeButton = useRef(1);
  const [pages, setPages] = useState([]);

  const generatePaginationArray = (pageNumber) => {
    const arr = Array.from({ length: totalPages }, (_item, index) => index + 1);

    if (totalPages < 8) {
      return arr;
    }

    if (pageNumber <= 4) {
      return [...arr.slice(0, 5), "...", totalPages];
    }

    if (pageNumber > totalPages - 4) {
      return [1, "...", ...arr.slice(totalPages - 5)];
    }

    return [
      1,
      "...",
      pageNumber - 1,
      pageNumber,
      pageNumber + 1,
      "...",
      totalPages,
    ];

    // const arr = Array.from(Array(totalPages), (_, index) => index + 1);
    // if (totalPages > 7) {
    //   if (pageNumber <= 4) {
    //     const filteredArr = arr.filter(
    //       (item) => item <= 5 || item === totalPages
    //     );
    //     filteredArr.splice(filteredArr.length - 1, 0, "...");
    //     return filteredArr;
    //   } else if (pageNumber > totalPages - 4) {
    //     const filteredArr = arr.filter(
    //       (item) => item === 1 || item > totalPages - 5
    //     );

    //     filteredArr.splice(1, 0, "...");
    //     return filteredArr;
    //   } else {
    //     const filteredArr = arr.filter(
    //       (item) =>
    //         item === 1 ||
    //         item === totalPages ||
    //         item === pageNumber ||
    //         item === pageNumber - 1 ||
    //         item === pageNumber + 1
    //     );

    //     filteredArr.splice(filteredArr.length - 1, 0, "...");
    //     filteredArr.splice(1, 0, "...");
    //     return filteredArr;
    //   }
    // }
  };

  const handleClick = (item) => {
    activeButton.current = item;
    onPageChange(item);

    setPages(generatePaginationArray(item));
  };

  useEffect(() => {
    if (totalPages > 0) {
      handleClick(1);
    }
  }, [totalPages]);

  return (
    <ul className="pagination">
      <li className="pagination__wrapper">
        <button
          className={`pagination__button ${
            activeButton.current === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            handleClick(1);
          }}
          disabled={activeButton.current === 1}
        >
          <img
            className="pagination__img"
            src="double-chevron.svg"
            alt="previous button"
          />
        </button>
      </li>
      <li className="pagination__wrapper">
        <button
          className={`pagination__button ${
            activeButton.current === 1 ? "disabled" : ""
          }`}
          onClick={() => {
            handleClick(activeButton.current - 1);
          }}
          disabled={activeButton.current === 1}
        >
          <img
            className="pagination__img"
            src="chevron.svg"
            alt="previous button"
          />
        </button>
      </li>

      {pages.map((item, index) => {
        return (
          <li className="pagination__wrapper" key={index}>
            {item !== "..." ? (
              <button
                className={`pagination__button ${
                  activeButton.current === item ? "active" : ""
                }`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item}
              </button>
            ) : (
              <p className="pagination__text">{item}</p>
            )}
          </li>
        );
      })}

      <li className="pagination__wrapper">
        <button
          className={`pagination__button ${
            activeButton.current === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            handleClick(activeButton.current + 1);
          }}
          disabled={activeButton.current === totalPages}
        >
          <img
            className="pagination__img"
            src="white-chevron.svg"
            alt="previous button"
          />
        </button>
      </li>
      <li className="pagination__wrapper">
        <button
          className={`pagination__button ${
            activeButton.current === totalPages ? "disabled" : ""
          }`}
          onClick={() => {
            handleClick(totalPages);
          }}
          disabled={activeButton.current === totalPages}
        >
          <img
            className="pagination__img"
            src="white-double-chevron.svg"
            alt="previous button"
          />
        </button>
      </li>
    </ul>
  );
};
