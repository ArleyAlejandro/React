import { useState } from "react";

const Category = ({ title, items, handleCheckboxChange}) => {
  // State para controlar la visivilidad de los items
  const [expanded, setExpanded] = useState(false);
  // Solo mostrar 3 items por categoría. default
  const visibleItems = expanded ? items : items.slice(0, 3);
  
  return (
    <div className="category">
      <h2 className="cat-title">{title}</h2>
      {visibleItems.map((item, index) => {
        // Convierte el objeto en un array de pares [clave, valor] -> ["mid", "1"]
        const [key, value] = Object.entries(item)[0];
        // Busca el primer valor que no sea value
        const nombre = Object.values(item).find((val) => val !== value);
        const inputId = `${title}-${index}`;

        return (
          <div key={inputId} className="category-item">
            <input
              data-category={title}
              data-name={nombre}
              type="checkbox"
              value={value}
              id={inputId}
              name={title}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={inputId}>{nombre}</label>
          </div>
        );
      })}

      {/* Mostrar botón solo si hay más de 3 elementos */}
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
