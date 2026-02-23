import { Product } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brand: string;
  thumbnail: string;
};

export const emptyProductFormValues: ProductFormValues = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: 1,
  brand: "",
  thumbnail: "",
};

export function toProductFormValues(product: Product): ProductFormValues {
  return {
    title: product.title ?? "",
    description: product.description ?? "",
    price: product.price ?? 0,
    stock: product.stock ?? 0,
    categoryId: product.categoryId,
    brand: product.brand ?? "",
    thumbnail: product.thumbnail ?? "",
  };
}

export function buildProductUpdatePayload(values: ProductFormValues): Partial<Product> {
  let availabilityStatus = "Out of Stock";
  if (values.stock > 10) {
    availabilityStatus = "In Stock";
  } else if (values.stock > 0) {
    availabilityStatus = "Low Stock";
  }

  return {
    title: values.title,
    description: values.description,
    price: values.price,
    stock: values.stock,
    categoryId: values.categoryId,
    brand: values.brand,
    thumbnail: values.thumbnail,
    availabilityStatus,
  };
}

export async function updateProduct(productId: number, payload: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera produkten.");
  }

  return response.json();
}

export async function createProduct(payload: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa produkten.");
  }

  return response.json();
}
