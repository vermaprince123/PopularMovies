// FilterDropdown.js

import React from 'react';
import './filterDropDown.css';

const FilterDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="filter-dropdown">
      <label className="filter-label">{label}</label>
      <select className="filter-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
