import { createContext, useState } from "react";

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
