import { checkUser } from "@/api/service/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogoutButton from "../LogoutButtonComponent";
import ProductCard, { ProductProps } from "./ProductCard";

import { adminProductApi } from "@/api/service/admin/product";
import ProductDetail from "./ProductDetail";

const ProductComponent = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const handleSelectProduct = (product: ProductProps) => {
    setSelectedProduct(product);
  };

  const navigate = useNavigate();

  // 檢查登入
  useEffect(() => {
    (async () => {
      const isLogin = await checkUser();
      if (!isLogin.success) {
        navigate("/Week2/login", { replace: true });
      } else {
        setLoading(false);
      }
    })();
  }, [navigate]);

  // 取得產品列表
  useEffect(() => {
    (async () => {
      const data = await adminProductApi.getAll({});
      setProducts(data.products);
    })();
  }, []);

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
      {
        <div className="p-4 max-w-[1296px] mx-auto md:flex gap-4">
          <div className="flex flex-col md:w-1/3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onChange={(selected) => {
                  handleSelectProduct(selected);
                  console.log("選擇了產品：", selected);
                }}
              />
            ))}
          </div>

          <div className="flex-1 border rounded p-4">
            {selectedProduct ? (
              <ProductDetail product={selectedProduct} />
            ) : (
              <p className="text-gray-500">請從左側卡片選擇商品查看詳情</p>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default ProductComponent;
