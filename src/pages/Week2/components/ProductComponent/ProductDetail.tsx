import React, { useEffect, useState } from "react";
import { z } from "zod";
import { ProductSchema } from "@/schemas/Product";

export type ProductProps = z.infer<typeof ProductSchema>;

interface ProductDetailProps {
  product: ProductProps;
}

// 將 imageUrl 轉換成 string，如果是 File 則使用 URL.createObjectURL 轉換，否則回傳空字串
const convertImageUrl = (value: string | File | null | undefined): string => {
  if (typeof value === "string") {
    return value;
  } else if (value instanceof File) {
    return URL.createObjectURL(value);
  }
  return "";
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  // 使用 lazy initializer 確保初始值為 string
  const [selectPic, setSelectedPic] = useState<string>(() =>
    convertImageUrl(product.imageUrl)
  );

  useEffect(() => {
    setSelectedPic(convertImageUrl(product.imageUrl));
  }, [product]);

  const handleSelectPic = (picture: string) => {
    setSelectedPic(picture);
  };

  return (
    <div className="flex">
      <div className="mb-4 w-1/2">
        <div className="relative w-96 h-96">
          <img
            src={selectPic}
            alt={product.title}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="rounded"
          />
        </div>
        <div className="mt-4">
          <h4 className="font-bold">更多圖片：</h4>
          <div className="flex gap-2 mt-2 cursor-pointer">
            {product.imagesUrl?.map((imgUrl, index) => (
              <img
                key={`${product.id}-${index}`}
                src={imgUrl}
                onClick={() => handleSelectPic(imgUrl)}
                alt={`${product.title}-${index}`}
                className="w-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="mb-2">分類：{product.category}</p>
        <p className="mb-2">詳細尺寸：{product.content}</p>
        <p className="mb-2">描述：{product.description}</p>
        <p className="mb-2">
          售價：{product.price} {product.unit}
        </p>
        <p className="mb-2">庫存：{product.num}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
