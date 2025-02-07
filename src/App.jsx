import Content from "./components/Content/Content";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header/Header"
import MainMenu from "./components/MainMenu/MainMenu";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside"

function App() {
  return (
    <ProductProvider>
      <Header/>
      <MainMenu/>
      <div className="flex-div">
      <Aside/>
      <Content/>
      </div>
      <Footer/>
    </ProductProvider>
  );
}

export default App;
