import React from 'react';

const FilterDropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  multiple = false,
  placeholder = 'Select...'
}) => {
  const handleSelectChange = (e) => {
    if (multiple) {
      const selected = Array.from(
        e.target.selectedOptions,
        option => option.value
      );
      onChange(selected);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className="filter-dropdown">
      <label htmlFor={`filter-${label}`}>{label}</label>
      <select
        id={`filter-${label}`}
        value={value}
        onChange={handleSelectChange}
        multiple={multiple}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
