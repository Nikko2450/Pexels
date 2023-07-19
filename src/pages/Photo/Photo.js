import { Container } from "../../components/Container/Container";
import { Search } from "../../components/Search/Search";

export const Photo = () => {
  return (
    <div className="photo">
      <Container>
        <div className="photo__wrapper">
          <Search placeholder="Search photo" />
          <Search placeholder="Image orientation" />
          <Search placeholder="Search by size" />
        </div>
      </Container>
    </div>
  );
};
