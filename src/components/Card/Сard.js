import { Link } from "react-router-dom";

export const Card = ({ src, alt }) => {
  return (
    <Link className="card" target="_blanck">
      <img className="card__img" src={src} alt={alt}></img>
    </Link>
  );
};
