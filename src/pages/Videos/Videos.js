import { Fragment, useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";
import { Select } from "../../components/Select/Select";
import { Card } from "../../components/Card/Сard";

const url = "https://api.pexels.com/videos";

export const Videos = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [filterList, setFilteredList] = useState({
    video: "",
    orientation: "",
    size: "",
  });

  useEffect(() => {
    if (filterList.video && (filterList.orientation || filterList.size)) {
      fetch(
        `${url}/search?query=${filterList.video}&orientation=${filterList.orientation}&size=${filterList.size}&page=1&per_page=16`,
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
          setData(value);
        })
        .catch((message) => {
          setError(message);
        });
    }
  }, [filterList]);

  useEffect(() => {
    fetch(`${url}/popular?page=1&per_page=16`, {
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
        setData(value);
      })
      .catch((message) => {
        setError(message);
      });
  }, []);

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
        <div className="videos__content">
          {data ? (
            data.videos.map((value) => {
              return (
                <Card
                  src={value.image}
                  key={value.id}
                  href={`/video/${value.id}`}
                />
              );
            })
          ) : (
            <p className="videos__desc">No photo found</p>
          )}
        </div>
      </Container>
    </div>
  );
};
