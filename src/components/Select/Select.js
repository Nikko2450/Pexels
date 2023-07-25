import { useState } from "react";

export const Select = ({ options, onChange, name }) => {
  const [selectedValue, setSelectValue] = useState("placeholder");

  const handleValueChange = (event) => {
    setSelectValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="select">
      <select
        className="select__list"
        value={selectedValue}
        onChange={handleValueChange}
      >
        <option disabled hidden value="placeholder">
          {name}
        </option>
        {options.map((item) => (
          <option key={item} className="select__element" value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
