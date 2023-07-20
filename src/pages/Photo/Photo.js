import { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";
import { Select } from "../../components/Select/Select";
import { Card } from "../../components/Card/Сard";

const url = "https://api.pexels.com/v1";

export const Photo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [filterList, setFilteredList] = useState({
    image: "",
    orientation: "",
    size: "",
  });

  useEffect(() => {
    if (filterList.image && (filterList.orientation || filterList.size)) {
      console.log(filterList);
      fetch(
        `${url}/search?query=${filterList.image}&orientation=${filterList.orientation}&size=${filterList.size}&page=1&per_page=16`,
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
    fetch(`${url}/curated?page=1&per_page=16`, {
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
    <div className="photo">
      <Container>
        <div className="photo__wrapper">
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
        <div className="photo__content">
          {data ? (
            data.photos.map((value) => {
              return <Card src={value.src.large} alt={value.alt} />;
            })
          ) : (
            <p>No photo found</p>
          )}
        </div>
      </Container>
    </div>
  );
};
