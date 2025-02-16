import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";
import FilterContext from "../../context/FilterContext";
import CartContext from "../../context/CartContext";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fullCart } = useContext(CartContext);
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

  // useEffect(() => {
  // console.log("Estado de fullCart :", fullCart);
  // }, [fullCart]);

  // 2️⃣ Filtrar productos en tiempo real
  const filteredProducts = products.filter((product) => {
    if (!Filter || Object.keys(Filter).length === 0) return true; // Sin filtros, mostrar todos

    return Object.entries(Filter).every(([key, values]) => {
      if (!values || values.length === 0) return true; // Si no hay valores en la categoría, no filtrar por ella

      const productValue = product[key] ? String(product[key]) : ""; // Convertir a string para evitar errores
      return values.includes(productValue);
    });
  });

  // console.log("Filtros:", Filter);
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
    // console.log({ selected: selectedProduct });
    // console.log(products[productId - 1]);

    // console.log(products.find((producto) => producto.pid === productId));

    if (!selectedProduct) {
      // console.log("no llega un producto");
      return;
    } else {
      // console.log("Producto encontrado:", selectedProduct);
    }

    setCart((prevCart) => {
      if (prevCart.some((item) => item.pid === selectedProduct.pid)) {
        return prevCart; // No agregar si ya está en el carrito
      }
      return [...prevCart, selectedProduct]; // Agregar si no está en el carrito
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Por defecto mostrar la lista de productos para hacer la compra
  if (fullCart === false) {
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
          <p className="error">No se encontraron productos</p>
        )}
      </div>
    );
  }
  // Mostrar la lista de productos dentro del carrito
  else {
    return <div className="wrapper">patata</div>;
  }
};

export default Content;
