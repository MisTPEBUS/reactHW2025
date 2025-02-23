import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  category: z.string().nonempty("產品類別不能為空"),
  content: z.string(),
  description: z.string(),
  is_enabled: z.union([z.literal(0), z.literal(1)]),
  title: z.string().nonempty("產品名稱不能為空"),
  unit: z.string().nonempty("產品單位不能為空"),
  origin_price: z.number().nonnegative({ message: "必須是非負數" }),
  price: z.number().nonnegative({ message: "必須是非負數" }),
  num: z.number().optional(),
  imageUrl: z
    .union([
      z.string().nullable().optional(),
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
          message: "必須是有效的圖片文件",
        })
        .optional(),
    ])
    .optional(),
  imagesUrl: z.array(z.string()).optional(),
  tags: z.string().optional(),
});

export const ProductQueryResParamsSchema = z.object({
  page: z.number().optional(),
  category: z.string().optional(),
});

export const ProductQueryResBodySchema = z.object({
  success: z.boolean(),
  products: z.array(ProductSchema),
  message: z.string().optional(),
  pagination: z.object({
    category: z.string().optional(),
    current_page: z.number(),
    has_next: z.boolean(),
    has_pre: z.boolean(),
    total_pages: z.number(),
  }),
});
