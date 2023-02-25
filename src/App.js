import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemInfo from "./pages/itemInfo";
import Products from "./pages/products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="*" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ItemInfo />} />
      </Routes>
    </div>
  );
}

export default App;
