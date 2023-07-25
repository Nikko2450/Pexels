import { Fragment, useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";
import { Select } from "../../components/Select/Select";
import { Card } from "../../components/Card/Сard";
import { Pagination } from "../../components/Pagination/Pagination";

const url = "https://api.pexels.com/videos";

export const Videos = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [filterList, setFilteredList] = useState({
    video: "",
    orientation: "",
    size: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkAndAddScrollbar = () => {
      const hasScrollbar = document.body.scrollHeight > window.innerHeight;
      if (hasScrollbar) {
        document.body.style.paddingRight = "0";
      } else {
        document.body.style.paddingRight = "16px";
      }
    };

    checkAndAddScrollbar();
  }, [data]);

  useEffect(() => {
    if (
      filterList.video ||
      (filterList.orientation && filterList.video) ||
      (filterList.size && filterList.video)
    ) {
      fetch(
        `${url}/search?query=${filterList.video}&orientation=${filterList.orientation}&size=${filterList.size}&page=${currentPage}&per_page=16`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((value) => {
          setTotalPages(Math.ceil(value.total_results / value.per_page));
          setData(value);
        })
        .catch((message) => {
          setError(message);
        });
    }
  }, [filterList, currentPage]);

  useEffect(() => {
    if (filterList.video === "") {
      fetch(`${url}/popular?page=${currentPage}&per_page=16`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((value) => {
          setTotalPages(Math.ceil(value.total_results / value.per_page));
          setData(value);
        })
        .catch((message) => {
          setError(message);
        });
    }
  }, [currentPage, filterList]);

  return (
    <div className="videos">
      <Container>
        <div className="videos__wrapper">
          <Search
            placeholder="Search Video"
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, video: value }))
            }
          />
          <Select
            name="Choose an orientation"
            options={["landscape", "portrait", "square"]}
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, orientation: value }))
            }
          />
          <Select
            name="Choose an video size"
            options={["large", "medium", "small"]}
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, size: value }))
            }
          />
        </div>
        <div className="videos__content">
          {data && data.videos.length > 0 ? (
            (document.body.style.paddingRight =
              "0" &&
              data.videos.map((value) => {
                return (
                  <Card
                    src={value.image}
                    key={value.id}
                    href={`/video/${value.id}`}
                  />
                );
              }))
          ) : (
            <p className="videos__desc">No photo found</p>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </Container>
    </div>
  );
};
