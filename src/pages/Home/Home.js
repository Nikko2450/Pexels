import { Link } from "react-router-dom";
import { Container } from "../../components/Container/Container";

export const Home = () => {
  return (
    <div className="home">
      <Container>
        <h1 className="home__title">What are you looking for?</h1>
        <div className="home__wrapper">
          <div className="home__link">
            <p className="home__subtitle">Go to search:</p>
            <Link className="home__photo" to="/photo" target="_blank">
              Photos
            </Link>
          </div>
          <div className="home__link">
            <p className="home__subtitle">Go to search:</p>
            <Link className="home__video" to="/video" target="_blank">
              Videos
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
