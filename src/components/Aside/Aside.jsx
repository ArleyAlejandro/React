import { useContext, useEffect, useState } from "react";
import Category from "../Categoria/Categoria";
import FilterContext from "../../context/FilterContext";

const Aside = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setFilter} = useContext(FilterContext);

  // console.log(Filter);

  useEffect(() => {
    fetch("http://localhost:8000/p3filtres.php")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCategories(data);
        // console.log(data);

        if (!data || typeof data !== "object") {
          setError(new Error("Datos inválidos recibidos"));
          return;
        }

        // console.log(data);
        // console.log({"categorias" : categories});
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
    // console.log(e.target);
    // Extrae el name, value y checked del checkbox clicado.
    const {name , value, checked } = e.target;
    const labelName = e.target.getAttribute("data-name");
    
    // console.log(name);
    // console.log(labelName);
    // console.log(value);
    // console.log(checked);

    setFilter((prevFilters) => {
      const updatedFilters = { ...prevFilters };
    
      if (checked) {
        // Agregar el filtro si no está presente
        if (!updatedFilters[name]) updatedFilters[name] = [];
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
};

export default Aside;
