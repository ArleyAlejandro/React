import { useContext, useEffect, useState } from "react";
import Category from "../Categoria/Categoria";
import FilterContext from "../../context/FilterContext";
import CartContext from "../../context/CartContext";

const Aside = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setFilter } = useContext(FilterContext);
  const { showCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:8000/p3filtres.php")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCategories(data);

        // Si no se recibe un objeto, lanzar un error
        if (!data || typeof data !== "object") {
          setError(new Error("Datos inválidos recibidos"));
          return;
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Manejo de errores
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Manejar el cambio de los checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const labelName = e.target.getAttribute("data-id");

    // Actualizar el estado de los filtros
    setFilter((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (checked) {
        // Si la categoría no existe, crearla
        if (!updatedFilters[name]) updatedFilters[name] = [];

        // Si el filtro ya está presente, no hacer nada
        if (!updatedFilters[name].includes(labelName)) {
          updatedFilters[name].push(labelName);
        }
      } else {
        // Eliminar el filtro
        updatedFilters[name] = updatedFilters[name].filter(
          (item) => item !== labelName
        );

        // Si la categoría queda vacía, eliminarla del objeto
        if (updatedFilters[name].length === 0) {
          const { [name]: _, ...newFilters } = updatedFilters;
          return newFilters;
        }
      }

      return { ...updatedFilters };
    });
  };

  // Por defecto mostrar la lista de filtros
  if (showCart === false) {
    return (
      <div className="aside-wrapper">
        {Object.entries(categories).map(([key, values]) => (
          <Category
            key={key}
            title={key}
            items={values}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    );
  }
};

export default Aside;
