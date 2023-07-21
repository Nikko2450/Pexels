import { Link } from "react-router-dom";

export const Card = ({ src, alt, href }) => {
  return (
    <Link className="card" to={href} target="_blanck">
      <img className="card__img" src={src} alt={alt}></img>
    </Link>
  );
};
