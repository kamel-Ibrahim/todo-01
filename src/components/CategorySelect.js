import React from "react";

const FIXED_CATEGORIES = ["All", "General", "School", "Work", "Personal"];

const CategorySelect = ({ value, onChange, includeAll = true }) => {
  const categories = includeAll ? FIXED_CATEGORIES : FIXED_CATEGORIES.slice(1);

  return (
    <div className="category-buttons">
      {categories.map((c) => (
        <button
          key={c}
          className={`btn ${value === c ? "btn-primary active" : ""}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;
