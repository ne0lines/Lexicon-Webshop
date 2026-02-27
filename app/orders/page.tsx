import type { ProductsResponse } from "../types";
import Link from 'next/link';
import AddProductButton from "../components/ProductAddButton";
import { SquarePen, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type OrderRow = {
  orderId: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewDate: string;
  productCount: number;
  orderTotal: number;
};

type OrderAggregation = {
  reviewerName: string;
  reviewerEmail: string;
  reviewDate: string;
  productIds: Set<number>;
  productCount: number;
  orderTotal: number;
};

function generateMockOrderId() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${randomPart}`;
}

function formatReviewDate(value: string) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return parsedDate.toLocaleDateString("sv-SE");
}

function formatPrice(value: number) {
  return Math.trunc(Number(value)).toLocaleString("sv-SE");
}

function shouldReplaceReviewDate(currentDate: string, nextDate: string) {
  const currentTime = new Date(currentDate).getTime();
  const nextTime = new Date(nextDate).getTime();
  return Number.isFinite(nextTime) && (!Number.isFinite(currentTime) || nextTime > currentTime);
}

function applyReviewToOrders(
  ordersByCustomer: Map<string, OrderAggregation>,
  product: ProductsResponse["products"][number],
  review: NonNullable<ProductsResponse["products"][number]["reviews"]>[number],
) {
  const reviewerEmail = review.reviewerEmail.trim().toLowerCase();
  const reviewerName = review.reviewerName.trim();

  if (!reviewerEmail) {
    return;
  }

  const existing = ordersByCustomer.get(reviewerEmail);
  if (!existing) {
    ordersByCustomer.set(reviewerEmail, {
      reviewerName,
      reviewerEmail,
      reviewDate: review.date,
      productIds: new Set<number>([product.id]),
      productCount: 1,
      orderTotal: Number(product.price) || 0,
    });
    return;
  }

  if (!existing.productIds.has(product.id)) {
    existing.productIds.add(product.id);
    existing.productCount += 1;
    existing.orderTotal += Number(product.price) || 0;
  }

  if (shouldReplaceReviewDate(existing.reviewDate, review.date)) {
    existing.reviewDate = review.date;
    existing.reviewerName = reviewerName;
  }
}

function buildOrders(products: ProductsResponse["products"]): OrderRow[] {
  const ordersByCustomer = new Map<string, OrderAggregation>();

  for (const product of products) {
    for (const review of product.reviews ?? []) {
      applyReviewToOrders(ordersByCustomer, product, review);
    }
  }

  return Array.from(ordersByCustomer.values())
    .sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())
    .map((row) => ({
      ...row,
      orderId: generateMockOrderId(),
      productCount: row.productCount,
      orderTotal: row.orderTotal,
    }));
}

export default async function OrdersPage() {
  const { products }: ProductsResponse = await fetch(
    `${API_URL}/products?_sort=id&_order=desc`,
  ).then((res) => res.json());
  const orders = buildOrders(products);

  return (
    <>
        <header className="fixed left-64 top-0 right-0 z-30">
            <section className="px-8 py-4 bg-white flex items-center justify-between">
                <div >
                    <h1 className="text-xl font-bold">Orders</h1>
                    <span className="text-gray-500 text-sm">Manage and fulfill orders</span>
                </div>
                <AddProductButton />
            </section>
        </header>
        <main className="w-full pl-70 pt-30 pb-15 bg-gray-50">
            <table className="w-full text-xs">
            <thead>
                <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-right">Order products</th>
                <th className="px-3 py-2 text-right">Order total</th>
                <th className="px-3 py-2 text-left">Order date</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                <tr key={`${order.orderId}-${order.reviewerEmail}`} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                        <Link href={`mailto:${order.reviewerEmail}`} className="text-blue-500 font-semibold hover:underline">{order.reviewerName}</Link><br />
                        <span className="text-gray-500">{order.orderId}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{order.productCount}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatPrice(order.orderTotal)} kr</td>
                    <td className="px-4 py-3 text-gray-600">{formatReviewDate(order.reviewDate)}</td>
                    <td className="px-3 py-2 align-middle overflow-hidden text-right flex gap-1 justify-end">
                        <button
                        type="button"
                        className="text-purple-600 bg-purple-200 p-1 rounded-md hover:bg-purple-700 hover:text-white"
                        >
                            <SquarePen className="w-4 h-4" />
                        </button>
                        <button
                        type="button"
                        className="text-red-600 bg-red-200 p-1 rounded-md hover:bg-red-700 hover:text-white"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </main>
    </>
  );
}
