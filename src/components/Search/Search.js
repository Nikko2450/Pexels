export const Search = ({ placeholder }) => {
  return (
    <div className="search">
      <img className="search__img" src="search.svg" alt="search" />
      <input className="search__input" type="text" placeholder={placeholder} />
    </div>
  );
};
