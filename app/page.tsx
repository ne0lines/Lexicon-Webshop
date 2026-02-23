import Header from "./components/header";
import type { ProductsResponse } from "./types";
import {
  Plus,
  Package2,
  CircleCheck,
  TriangleAlert,
  CircleX,
  Funnel,
  SquarePen,
  Trash2,
  Search,
} from "lucide-react";

const API_URL = "http://localhost:4000";
const defaultLimit = 20;

function formatPrice(value: number) {
  return Math.trunc(Number(value)).toLocaleString("sv-SE");
}

export default async function Home() {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());


  return (
    <>

      {/* Replace with header component. Total is already created in fetch */}
      <Header products={products} total={total} />
      <main className="w-full pl-70 pt-70 pb-15 bg-gray-50">
        <div className="bg-pink-100 rounded-md p-2 flex items-center justify-center text-pink-500">
          <CircleX />
        </div>
        <div>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Product</th>
                <th>Category</th>
                <th className="text-right">Price</th>
                <th className="text-right">Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-3 py-2 align-middle"><img src={product.thumbnail} alt={product.title} className="w-10" /></td>
                  <td className="px-3 py-2 align-middle flex flex-col truncate"><a href={`/${product.id}`} className="font-semibold text-blue-500 hover:text-blue-700">{product.title}</a><span className="text-xs text-gray-400">{product.sku}</span></td>
                  <td className="px-3 py-2 align-middle text-gray-700 truncate">{product.category?.name}</td>
                  <td className="px-3 py-2 align-middle text-right nowrap">{formatPrice(product.price)} kr</td>
                  <td className="px-3 py-2 align-middle text-right">{product.stock}pcs</td>
                  <td className={`px-3 py-2 align-middle text-center ${((product.stock ?? 0) > 10) ? 'text-green-700' : (product.stock ?? 0) > 0 ? 'text-yellow-700' : 'text-red-700'}`}>{product.availabilityStatus}</td>
                  <td className="px-3 py-2 align-middle text-right flex gap-1">
                    <button className="text-purple-600 bg-purple-200 p-1 rounded-md hover:bg-purple-700 hover:text-white"><SquarePen className="w-4 h-4" /></button>
                    <button className="text-red-600 bg-red-200 p-1 rounded-md hover:bg-red-700 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer total={total} />
    </>
  );
}
