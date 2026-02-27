import type { ProductsResponse } from "../types";
import AddProductButton from "../components/ProductAddButton";
import {
  SquarePen,
  Trash2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Customer = {
  reviewerName: string;
  reviewerEmail: string;
  reviewedProductIds: Set<number>;
  productsBought: number;
  totalSpent: number;
};

function formatPrice(value: number) {
  return Math.trunc(Number(value)).toLocaleString("sv-SE");
}

export default async function CustomersPage() {
  const { products }: ProductsResponse = await fetch(
    `${API_URL}/products?_sort=id&_order=desc`,
  ).then((res) => res.json());

  const uniqueCustomersMap = new Map<string, Customer>();

  for (const product of products) {
    for (const review of product.reviews ?? []) {
      const email = review.reviewerEmail.trim().toLowerCase();

      if (!email) {
        continue;
      }

      if (!uniqueCustomersMap.has(email)) {
        uniqueCustomersMap.set(email, {
          reviewerName: review.reviewerName.trim(),
          reviewerEmail: review.reviewerEmail.trim(),
          reviewedProductIds: new Set<number>(),
          productsBought: 0,
          totalSpent: 0,
        });
      }

      const customer = uniqueCustomersMap.get(email);
      if (!customer) {
        continue;
      }

      if (!customer.reviewedProductIds.has(product.id)) {
        customer.reviewedProductIds.add(product.id);
        customer.productsBought += 1;
        customer.totalSpent += Number(product.price) || 0;
      }
    }
  }

  const customers = Array.from(uniqueCustomersMap.values())
    .map((customer) => ({
      reviewerName: customer.reviewerName,
      reviewerEmail: customer.reviewerEmail,
      productsBought: customer.productsBought,
      totalSpent: customer.totalSpent,
    }))
    .sort((a, b) => a.reviewerName.localeCompare(b.reviewerName, "sv-SE"));

  return (
    <>
        <header className="fixed left-64 top-0 right-0 z-30">
            <section className="px-8 py-4 bg-white flex items-center justify-between">
                <div >
                    <h1 className="text-xl font-bold">Customers</h1>
                    <span className="text-gray-500 text-sm">Manage your customer relationships</span>
                </div>
                <AddProductButton />
            </section>
        </header>
        <main className="w-full pl-70 pt-30 pb-15 bg-gray-50">
            <table className="w-full text-xs">
            <thead>
                <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-center">Purchases</th>
              <th className="px-3 py-2 text-right">Spent</th>
              <th className="px-3 py-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                <tr key={customer.reviewerEmail} className="border-t border-gray-100">
                    <td className="px-3 py-2 align-middle font-semibold text-blue-500 whitespace-nowrap truncate">{customer.reviewerName}</td>
                    <td className="px-3 py-2 align-middle">{customer.reviewerEmail}</td>
                <td className="px-3 py-2 align-middle text-center">{customer.productsBought}</td>
                <td className="px-3 py-2 align-middle text-right">{formatPrice(customer.totalSpent)} kr</td>
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
