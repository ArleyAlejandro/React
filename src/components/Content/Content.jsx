import { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import ProductContext from "../../context/ProductContext";

// uso de los imports
// useContext: acceder al contexto global ProductContext para manejar el carrito.
// useEffect:  ejecutar la carga de datos desde un archivo JSON.
// useState:  gestionar el estado de los productos, la carga y los errores.

// recibe selectedFilters como prop. Este objeto contiene los filtros seleccionados en el sidebar
const Content = ({ selectedFilters }) => {
  const [products, setProducts] = useState([]); //products: Guarda la lista de productos obtenidos del JSON.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(ProductContext);

  // Este hook permite ejecutar efectos secundarios en los componentes de React. El código dentro de useEffect se ejecuta cuando el componente se monta (es decir, cuando se renderiza por primera vez).
  // El segundo parámetro [] asegura que el efecto se ejecute solo una vez
  useEffect(() => {
    fetch("http://localhost:8000/p3cataleg.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleClick = (e) => {
    // console.log("handleClick ejecutado");
    e.stopPropagation();

    // Obtener el ID del producto
    const productId = e.target.getAttribute("data-id"); //Se obtiene el pid del producto desde el atributo data-id del HTML.

    if (!productId) {
      console.log("No llega un id");
      return;
    } else {
      console.log("Llega el id: ", productId);
    }

    // quiero encontrar el producto que tiene como pid productoId - 1
    // products empieza desde el indice 0, sin embargo el id siempre empieza desde el 1
    // entonces si no le resto 1 , sería el producto siguiente 

    // console.log({ "Productos Clickado: ": products[productId - 1] });
    var selectedProduct = products[productId - 1];
    // console.log(selectedProduct);

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
  const filteredProducts = products.filter((product) => {
    // Si selectedFilters está vacío, muestra todos los productos.
    if (Object.keys(selectedFilters).length === 0) return true;

    // Convierte { marca: ["Apple", "Samsung"] } en [[ "marca", ["Apple", "Samsung"] ]].
    // Para cada categoría filtrada, revisa si el valor del producto (product[category]) está dentro de los valores permitidos (values).
    // Si alguna categoría no coincide, el producto es eliminado.
    return Object.entries(selectedFilters).every(([category, values]) =>
      values.includes(product[category])
    );
  });

  // Renderizar los Productos
  return (
    <div className="wrapper">
      {/* {filteredProducts.map((product) => ( */}
      {products.map((product) => (
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
      ))}
    </div>
  );
};

export default Content;
