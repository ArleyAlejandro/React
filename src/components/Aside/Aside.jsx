import { useEffect, useState } from "react";
import Category from "../Categoria/Categoria";

const Aside = ({ setSelectedFilters }) => {
  const [categories, setCategories] = useState({});// categories: Almacena las categorías de filtros obtenidas del JSON.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Manejo de checkboxes
  const handleCheckboxChange = (e) => {

    // Extrae el name, value y checked del checkbox clicado.
    const { name, value, checked } = e.target;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      
      // Actualiza setSelectedFilters, añadiendo o eliminando filtros según si el checkbox está marcado o desmarcado.
      // Si no hay más filtros de una categoría, la elimina.
      if (checked) {
        if (!updatedFilters[name]) updatedFilters[name] = [];
        if (!updatedFilters[name].includes(value)) updatedFilters[name].push(value);
      } else {
        updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
        if (updatedFilters[name].length === 0) delete updatedFilters[name];
      }
      
      console.log(updatedFilters)
      return updatedFilters;
    });
  };

  return (
    <div className="aside-wrapper">
      {/* Object.entries(categories) convierte el objeto en un array de [clave, valores] */}
      {Object.entries(categories).map(([key, values]) => (
        <Category key={key} title={key} items={values} handleCheckboxChange={handleCheckboxChange}/>
      ))}
    </div>
  );
};

export default Aside;
