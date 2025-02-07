import { useEffect, useState } from "react";
import Category from "../Categoria/Categoria";

const Content = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({}); // Definir el estado

  useEffect(() => {
    fetch("../../query-json/p3filtres.json")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCategories(data[0]);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Manejador de cambios en los checkboxes
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    // Actualizar el estado
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      // Agregar o quitar el valor del filtro seleccionado
      if (checked) {
        if (!updatedFilters[name]) {
          updatedFilters[name] = [];
        }

        // Agregar solo si el valor no está ya en el array
        if (!updatedFilters[name].includes(value)) {
          updatedFilters[name].push(value);
        }
      } else {
        updatedFilters[name] = updatedFilters[name].filter(
          (item) => item !== value
        );

        // Eliminar la categoría si está vacía
        if (updatedFilters[name].length === 0) {
          delete updatedFilters[name];
        }
      }

      console.log("Filtros seleccionados:", updatedFilters);

      return updatedFilters;
    });
  };

  // Se devolverá un div con muchas categorias. paso el título y el valor al componente Category, para mostrarlos
  // allí
  return (
    <div className="aside-wrapper">
      {Object.entries(categories).map(([key, values]) => (
        <Category key={key} title={key} items={values} handleCheckboxChange={handleCheckboxChange}/>
      ))}
    </div>
  );
};

export default Content;
