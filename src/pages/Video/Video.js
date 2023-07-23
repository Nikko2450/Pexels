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
  }, [containerRef.current]);

  return (
    <div className="video">
      <Container>
        {data && (
          <div className="video__wrapper">
            <div className="video__wrapper-play" ref={containerRef}>
              <iframe
                width={Math.min(data.video_files[0].width, containerWidth)}
                height={
                  (data.video_files[0].height / data.video_files[0].width) *
                  Math.min(data.video_files[0].width, containerWidth)
                }
                className="video__play"
                src={data.video_files[0].link}
                allow="autoplay"
              ></iframe>
            </div>
            <h2 className="video__user">{data.user.name}</h2>
            <div className="video__user-links">
              <a
                className="video__user-link"
                href={data.user.url}
                target="_blank"
              >
                User link
              </a>
            </div>
            <p className="video__quality">
              Video quality: <span>'{data.video_files[0].quality}'</span>
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};
