import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import ProductComponent from "./components/ProductComponent";

const Week3 = () => {
  return (
    <div className="overflow-auto container">
      <Routes>
        <Route index element={<ProductComponent />} />
        <Route path="login" element={<LoginComponent />} />
      </Routes>
    </div>
  );
};

export default Week3;
