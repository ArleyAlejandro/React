import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";
import FilterContext from "../../context/FilterContext";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setCart } = useContext(ProductContext);
  const { Filter } = useContext(FilterContext);

   // 1️⃣ Cargar productos desde la API SOLO UNA VEZ
   useEffect(() => {
    fetch("http://localhost:8000/p3cataleg.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // 2️⃣ Filtrar productos en tiempo real
  const filteredProducts = products.filter((product) => {
    if (!Filter || Object.keys(Filter).length === 0) return true; // Sin filtros, mostrar todos

    return Object.entries(Filter).every(([key, values]) => {
      if (!values || values.length === 0) return true;  // Si no hay valores en la categoría, no filtrar por ella

      const productValue = product[key] ? String(product[key]) : ""; // Convertir a string para evitar errores
      return values.includes(productValue);
    });
  });


  console.log("Filtros:", Filter);
  // console.log("Productos:", products);

  const handleClick = (e) => {
    // console.log("handleClick ejecutado");
    e.stopPropagation();

    // Obtener el ID del producto
    const productId = e.target.getAttribute("data-id"); //Se obtiene el pid del producto desde el atributo data-id del HTML.

    if (!productId) {
      // console.log("No llega un id");
      return;
    } else {
      // console.log("Llega el id: ", productId);
    }

    // console.log({ "Productos Clickado: ": products[productId - 1] });
    var selectedProduct = products[productId - 1];
    console.log(selectedProduct);

    // console.log(products.find((producto) => producto.pid === productId));

    if (!selectedProduct) {
      // console.log("no llega un producto");
      return;
    } else {
      // console.log("Producto encontrado:", selectedProduct);
    }

    // Verificar si ya está en el carrito
    setCart((prevCart) => {
      // Si ya está en el carrito, no lo añade de nuevo.
      if (prevCart.some((item) => item.pid === productId)) {
        return prevCart;
      }

      // console.log({"Carrito antes de agregar productos: ":prevCart});

      return [...prevCart, selectedProduct];
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar productos según los filtros seleccionados

  // Renderizar los Productos
  return (
    <div className="wrapper">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Product
            key={product.model}
            pid={product.pid}
            marca={product.marca}
            model={product.model}
            imatge={product.imatge}
            processador={product.processador}
            ram={product.ram}
            emmagatzematge={product.emmagatzematge}
            polzades={product.polzades}
            preu={product.preu}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p>No se encontraron productos con los filtros seleccionados.</p>
      )}
    </div>
  );
};

export default Content;
