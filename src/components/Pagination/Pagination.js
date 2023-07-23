import { useEffect, useRef, useState } from "react";

export const Pagination = ({ totalPages, onPageChange }) => {
  const activeButton = useRef(1);
  const [pages, setPages] = useState([]);

  const handleClick = (item) => {
    activeButton.current = item + 1;
    onPageChange(item + 1);

    if (activeButton.current > 4) {
      const arr = Array.from(Array(totalPages).keys());
      if (totalPages > 8) {
        const filteredArr = arr.filter(
          (item) =>
            item + 1 === 1 ||
            item + 1 === totalPages ||
            item + 1 === activeButton.current ||
            item + 1 === activeButton.current - 1 ||
            item + 1 === activeButton.current + 1
        );

        filteredArr.splice(filteredArr.length - 1, 0, "...");
        filteredArr.splice(1, 0, "...");

        setPages(filteredArr);
      }
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      setPages(() => {
        const arr = Array.from(Array(totalPages).keys());

        if (totalPages > 8) {
          const filteredArr = arr.filter(
            (item) => item < 5 || item + 1 === totalPages
          );
          filteredArr.splice(filteredArr.length - 1, 0, "...");

          return filteredArr;
        }
        return arr;
      });
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
            activeButton.current = 1;
            onPageChange(1);
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
            activeButton.current -= 1;
            onPageChange(activeButton.current - 1);
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
                  activeButton.current === item + 1 ? "active" : ""
                }`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item + 1}
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
            activeButton.current += 1;
            onPageChange(activeButton + 1);
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
            activeButton.current = totalPages;
            onPageChange(totalPages);
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
