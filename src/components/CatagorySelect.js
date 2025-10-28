import React, { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

/**
 * CategorySelect integrates with the CategoryContext from Person 4.
 * Props: value, onChange, includeAll (default false)
 */
const CategorySelect = ({ value, onChange, includeAll=false, className='' }) => {
  const { categories = [] } = useContext(CategoryContext) || { categories: [] };
  const list = includeAll ? ['All', ...categories] : categories;
  return (
    <select className={`category-select ${className}`} value={value} onChange={e=>onChange(e.target.value)}>
      {list.map((c) => (
        <option key={c} value={c === 'All' ? '' : c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
