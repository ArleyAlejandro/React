import Content from "./components/Content/Content";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Content />
    </ProductProvider>
  );
}

export default App;
