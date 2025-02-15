import { createContext, useState } from "react";

const FilterContext = createContext(null);

const FilterProvider = ({ children }) => {
  
  const [Filter, setFilter] = useState([]);

  return (
    <>
      {
        <FilterContext.Provider value={{ Filter, setFilter }}>
          {children}
        </FilterContext.Provider>
      }
    </>
  );
};

export { FilterProvider };
export default FilterContext;