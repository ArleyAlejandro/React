import { useState } from "react"; // ✅ Asegura importar useState
import Content from "./components/Content/Content";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header/Header";
import MainMenu from "./components/MainMenu/MainMenu";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";

function App() {
  // selectedFilters: Objeto que guarda los filtros seleccionados
  // setSelectedFilters: Función para actualizar los filtros cuando el usuario marca/desmarca checkboxes.
  // useState({}): Inicia el estado como un objeto vacío (sin filtros aplicados).
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <ProductProvider>
      <Header />
      <MainMenu />
      <div className="flex-div">
        <Aside setSelectedFilters={setSelectedFilters} /> {/* ✅ PASO CORRECTAMENTE LA PROP */}
        <Content selectedFilters={selectedFilters} />
      </div>
      <Footer />
    </ProductProvider>
  );
}


export default App;
