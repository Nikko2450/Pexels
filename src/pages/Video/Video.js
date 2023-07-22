import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";

const url = "https://api.pexels.com/videos/videos/";

export const Video = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWhidth] = useState(0);

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

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWhidth(width);
        console.log(width);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  return (
    <div className="video">
      <Container>
        {data && (
          <div className="video__wrapper">
            <div className="video__wrapper-play" ref={containerRef}>
              <iframe
                width={containerWidth}
                height={"100%"}
                className="video__play"
                src={data.video_files[2].link}
                allow="autoplay"
                frameborder="0"
              ></iframe>
            </div>
            <h2 className="video__user">
              <span>{data.user.name}</span>
            </h2>
            <div className="video__user-links">
              <a
                className="video__user-link"
                href={data.user.url}
                target="_blank"
              >
                User link
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
