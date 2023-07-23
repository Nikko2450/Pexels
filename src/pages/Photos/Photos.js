import { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";
import { Select } from "../../components/Select/Select";
import { Card } from "../../components/Card/Сard";
import { Pagination } from "../../components/Pagination/Pagination";

const url = "https://api.pexels.com/v1";

export const Photos = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [filterList, setFilteredList] = useState({
    image: "",
    orientation: "",
    size: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (
      filterList.image ||
      (filterList.orientation && filterList.image) ||
      (filterList.size && filterList.image)
    ) {
      fetch(
        `${url}/search?query=${filterList.image}&orientation=${filterList.orientation}&size=${filterList.size}&page=${currentPage}&per_page=16`,
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
    if (filterList.image === "") {
      fetch(`${url}/curated?page=${currentPage}&per_page=16`, {
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
  }, [currentPage]);

  return (
    <div className="photos">
      <Container>
        <div className="photos__wrapper">
          <Search
            placeholder="Search photo"
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, image: value }))
            }
          />
          <Select
            options={["landscape", "portrait", "square"]}
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, orientation: value }))
            }
          />
          <Select
            options={["large", "medium", "small"]}
            onChange={(value) =>
              setFilteredList((obj) => ({ ...obj, size: value }))
            }
          />
        </div>
        <div className="photos__content">
          {data ? (
            data.photos.map((value) => {
              return (
                <Card
                  src={value.src.large}
                  alt={value.alt}
                  key={value.id}
                  href={`/photo/${value.id}`}
                />
              );
            })
          ) : (
            <p className="photos__desc">No photo found</p>
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
