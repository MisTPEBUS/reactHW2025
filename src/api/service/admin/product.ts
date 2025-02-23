import axiosClient from "@/api/axiosInstance";
import { z } from "zod";
import {
  ProductQueryResBodySchema,
  ProductQueryResParamsSchema,
  ProductSchema,
} from "@/schemas/Product";
import { safeParseCheckRes } from "@/utlis/zodUtils";
import { getAuthHeaders } from "../auth/type";

const baseUrl = `/api/${import.meta.env.VITE_API_PATH}/admin`;

type ProductQueryResBody = z.infer<typeof ProductQueryResBodySchema>;
type ProductQueryResParams = z.infer<typeof ProductQueryResParamsSchema>;
type Product = z.infer<typeof ProductSchema>;

export const adminProductApi = {
  getAll: async ({ page, category }: ProductQueryResParams) => {
    const response = await axiosClient.get<ProductQueryResBody>(
      `${baseUrl}/products`,
      {
        params: { page, category },
        headers: getAuthHeaders(),
      }
    );
    const result = safeParseCheckRes(ProductQueryResBodySchema, response.data);
    return result;
  },
  create: async (product: Product) => {
    const data = { data: product };
    const response = await axiosClient.post(`${baseUrl}/product`, data);
    console.log(response.data);
    return response.data;
  },
  update: async (id: string, product: Product) => {
    const data = { data: product };
    const response = await axiosClient.put(`${baseUrl}/product/${id}`, data);
    console.log(response.data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axiosClient.delete(`${baseUrl}/product/${id}`);
    return response.data;
  },
};
