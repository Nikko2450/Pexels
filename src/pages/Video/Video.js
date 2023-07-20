import { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";
import { Select } from "../../components/Select/Select";

const url = "https://api.pexels.com/videos";

export const Video = () => {
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
    <div className="video">
      <Container>
        <div className="video__wrapper">
          <Search placeholder="Search Video" />
          <Select options={["landscape", "portrait", "square"]} />
          <Select options={["large(24MP)", "medium(12MP)", "small(4MP)"]} />
        </div>
        <div className="video__content">
          {data
            ? data.videos.map((value) => {
                return value;
              })
            : null}
        </div>
      </Container>
    </div>
  );
};
