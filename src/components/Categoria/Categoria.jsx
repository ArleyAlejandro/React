import { useState } from "react";

const Category = ({ title, items, handleCheckboxChange }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className="category">
      <h2 className="cat-title">{title}</h2>
      {visibleItems.map((item, index) => {
        const [key, value] = Object.entries(item)[0];
        const nombre = Object.values(item).find((val) => val !== value);
        const inputId = `${title}-${index}`;

        return (
          <div key={inputId} className="category-item">
            <input
              data-id={nombre}
              type="checkbox"
              id={inputId}
              name={title}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={inputId}>{nombre}</label>
          </div>
        );
      })}

      {items.length > 3 && (
        <button
          className="toggle-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};

export default Category;
