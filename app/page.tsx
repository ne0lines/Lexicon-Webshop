import Footer from "./components/Footer-component";
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
      <header className="fixed left-64 top-0 right-0 z-30">
        <section className="px-8 py-4 bg-white flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Product management</h1>
            <span className="text-gray-500 text-sm">
              Manage your store inventory
            </span>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-purple-700">
            <Plus /> Add product
          </button>
        </section>
        <section className="grid grid-cols-4 gap-6 mb-8 mt-24 px-8 py-4 bg-gray-50">
          <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 mb-1">Total products</span>
              <span className="block text-2xl font-bold">248</span>
            </div>
            <div className="bg-purple-100 rounded-md p-2 flex items-center justify-center text-purple-500">
              <Package2 />
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 mb-1">In stock</span>
              <span className="block text-2xl font-bold">189</span>
            </div>
            <div className="bg-green-100 rounded-md p-2 flex items-center justify-center text-green-500">
              <CircleCheck />
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 mb-1">Low stock</span>
              <span className="block text-2xl font-bold">34</span>
            </div>
            <div className="bg-yellow-100 rounded-md p-2 flex items-center justify-center text-yellow-500">
              <TriangleAlert />
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 mb-1">Out of stock</span>
              <span className="block text-2xl font-bold">25</span>
            </div>
            <div className="bg-pink-100 rounded-md p-2 flex items-center justify-center text-pink-500">
              <CircleX />
            </div>
          </div>
        </section>
        <form className="flex items-center text-xs gap-4 mb-6 border-gray-300 px-8 py-4 bg-white">
          <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center flex-1">
            <Search className="w-4 h-4 pink-500" />
            <label htmlFor="search-input" className="hidden">
              Sök bland produkter
            </label>
            <input
              name="search-input"
              placeholder="Search products..."
              id="search-input"
            />
          </div>
          <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
            <label htmlFor="category" className="hidden">
              Välj kategori
            </label>
            <select id="category">
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="2">Category 3</option>
            </select>
          </div>
          <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
            <label htmlFor="status" className="hidden">
              Välj lagerstatus
            </label>
            <select id="category">
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
            <Funnel className="w-4 h-4" />
            <label htmlFor="filter" className="hidden">
              Filtrera produkter
            </label>
            <button type="button" id="filter">
              Filter
            </button>
          </div>
        </form>
      </header>
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
                  <td className="px-3 py-2 align-middle">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-10"
                    />
                  </td>
                  <td className="px-3 py-2 align-middle flex flex-col truncate">
                    <a
                      href={`/${product.id}`}
                      className="font-semibold text-blue-500 hover:text-blue-700"
                    >
                      {product.title}
                    </a>
                    <span className="text-xs text-gray-400">{product.sku}</span>
                  </td>
                  <td className="px-3 py-2 align-middle text-gray-700 truncate">
                    {product.category?.name}
                  </td>
                  <td className="px-3 py-2 align-middle text-right nowrap">
                    {formatPrice(product.price)} kr
                  </td>
                  <td className="px-3 py-2 align-middle text-right">
                    {product.stock}pcs
                  </td>
                  <td
                    className={`px-3 py-2 align-middle text-center ${(product.stock ?? 0) > 10 ? "text-green-700" : (product.stock ?? 0) > 0 ? "text-yellow-700" : "text-red-700"}`}
                  >
                    {product.availabilityStatus}
                  </td>
                  <td className="px-3 py-2 align-middle text-right flex gap-1">
                    <button className="text-purple-600 bg-purple-200 p-1 rounded-md hover:bg-purple-700 hover:text-white">
                      <SquarePen className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 bg-red-200 p-1 rounded-md hover:bg-red-700 hover:text-white">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
