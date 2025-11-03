
import React, { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
const CategorySelect = ({ value, onChange, includeAll = false, className = "" }) => {
    const { categories = [] } = useContext(CategoryContext) || { categories: [] };

    const baseList = includeAll ? ["All", "General", ...categories] : categories;
    const list = [...new Set(baseList)];

    return (
        <div className={`category-buttons ${className}`}>
            {list.map((cat) => (
                <button
                    key={cat}
                    className={value === cat ? "active" : ""}
                    onClick={() => onChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};




export default CategorySelect;
