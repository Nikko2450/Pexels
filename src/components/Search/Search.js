import { useState } from "react";

export const Search = ({ placeholder, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const hadleBlur = () => {
    onChange(value);
  };

  const hadleKeyPress = (event) => {
    if (event.key === "Enter") {
      onChange(value);
    }
  };

  return (
    <div className="search">
      <img className="search__img" src="search.svg" alt="search" />
      <input
        className="search__input"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={hadleBlur}
        onKeyDown={hadleKeyPress}
      />
    </div>
  );
};
