import type { Category, ProductsResponse } from "./types";
import AddProductButton from "./components/ProductAddButton";
import Header from "./components/header";
import Footer from "./components/Footer-component";
import ProductsTable from "./components/ProductsTable";

import {
  Package2,
  CircleCheck,
  TriangleAlert,
  CircleX,
  Funnel,
  Search,
} from "lucide-react";

const API_URL = "http://localhost:4000";
const defaultLimit = 20;


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  console.log("currentPage= ", { currentPage });
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category&_page=${currentPage}`,
  ).then((res) => res.json());

  // Check if the products is "in stock"
  // If a stock value is 0 or it is undefined, filter it out (all of the below use this)
  const inStock = products.filter((p) => (p.stock ?? 0) > 0).length;

  // Check if products is in "low stock"
  const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 20).length;

  // Check if products is _out of stock_
  const outOfStock = products.filter((p) => (p.stock ?? 0) === 0).length;


  const categories: Category[] = await fetch(`${API_URL}/categories`).then((res) => res.json());
  
  return (
    <>

      {/* Replace with header component. Total is already created in fetch */}
      <Header total={total} inStock={inStock} lowStock={lowStock} outOfStock={outOfStock} />
      <header className="fixed left-64 top-0 right-0 z-30">
        <section className="px-8 py-4 bg-white flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Product management</h1>
            <span className="text-gray-500 text-sm">
              Manage your store inventory
            </span>
          </div>
          <AddProductButton />
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
        <div>
          <ProductsTable products={products} categories={categories} />
        </div>
      </main>
      <Footer total={total} pages={pages} />
    </>
  );
}
