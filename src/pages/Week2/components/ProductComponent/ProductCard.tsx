import { z } from "zod";
import { ProductSchema } from "@/schemas/Product";

export type ProductProps = z.infer<typeof ProductSchema>;

interface ProductCardProps {
  product: ProductProps;
  onChange: (product: ProductProps) => void;
}

const ProductCard = ({ product, onChange }: ProductCardProps) => {
  return (
    <div
      className="border border-primary rounded-md p-2 cursor-pointer hover:bg-primary-dark"
      onClick={() => onChange(product)}
    >
      <h3 className="font-bold text-lg mb-1">{product.title}</h3>
      <p>
        價格：{product.price}/{product.unit}
      </p>
      <p>分類：{product.category}</p>
    </div>
  );
};

export default ProductCard;
