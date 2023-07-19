import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";

export const Video = () => {
  return (
    <div className="video">
      <Container>
        <div className="video__wrapper">
          <Search placeholder="Search Video" />
          <Search placeholder="Image orientation" />
          <Search placeholder="Search by size" />
        </div>
      </Container>
    </div>
  );
};
