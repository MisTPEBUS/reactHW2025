import { checkUser } from "@/api/service/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogoutButton from "../LogoutButtonComponent";
import ProductTableListComponent from "../TableCompoent";

const ProductComponent = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 檢查登入
  useEffect(() => {
    (async () => {
      const isLogin = await checkUser();
      if (!isLogin.success) {
        navigate("/Week3/login", { replace: true });
      } else {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>檢查登入中請微笑...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <LogoutButton />
      </div>
    </>
  );
};

export default ProductComponent;
