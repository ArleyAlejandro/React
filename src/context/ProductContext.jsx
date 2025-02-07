import { createContext, useState } from "react";

// El ProductProvider es un componente que actúa como un proveedor de contexto. 
// Esto significa que envuelve a los componentes que necesitan acceso al estado 
// compartido (en este caso, el carrito de compras) y les permite consumir ese 
// estado a través del contexto. Este componente hace lo siguiente:

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <>
      {
        <ProductContext.Provider value={{ cart, setCart }}>
          {children}
        </ProductContext.Provider>
      }
    </>
  );
};

export { ProductProvider };
export default ProductContext;

// El Contexto de React (Context) es una forma de compartir datos entre componentes sin tener que 
// pasar props manualmente en cada nivel del árbol de componentes. En otras palabras, se utiliza 
// para evitar el "prop drilling", que es cuando tienes que pasar datos a través de múltiples 
// componentes intermedios solo para llegar a un componente que lo necesita.
