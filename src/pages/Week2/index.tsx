import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import ProductPageComponent from "./components/ProductComponent";
const Week2 = () => {
  return (
    <div className="overflow-auto container">
      <Routes>
        <Route index element={<ProductPageComponent />} />
        <Route path="login" element={<LoginComponent />} />
      </Routes>
    </div>
  );
};

export default Week2;
