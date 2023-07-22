import { useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useEffect, useState } from "react";

const url = "https://api.pexels.com/v1/photos/";

export const Photo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch(`${url}${id}`, {
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
        {data && (
          <>
            {data.alt && <h1 className="photo__title">{data.alt}</h1>}
            <div className="photo__wrapper">
              <div className="photo__wrapper-img">
                <img
                  className="photo__img"
                  src={data.src.large}
                  alt={data.alt}
                />
              </div>
              <div>
                <div className="photo__links-wrapper">
                  <a className="photo__links" href={data.url} target="_blank">
                    <div className="photo__link">Link to photo</div>
                  </a>
                  <a
                    className="photo__links"
                    href={data.photographer_url}
                    target="_blank"
                  >
                    <div className="photo__link">Link to the photographer</div>
                  </a>
                </div>
                <div className="photo__text">
                  <p className="photo__photographer paragraph">
                    Photographer: <span>{data.photographer}</span>
                  </p>
                  <div className="photo__wrapper-avg">
                    <p className="photo__desc paragraph">
                      Average color intensity:
                    </p>
                    <span
                      className="photo__avg"
                      style={{ backgroundColor: data.avg_color }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
