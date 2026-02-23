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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
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



  const categories: Category[] = await fetch(`${API_URL}/categories`).then((res) => res.json());
  
  return (
    <>

      {/* Replace with header component. Total is already created in fetch */}
      <Header products={products} total={total} />
      <main className="w-full pl-70 pt-70 pb-15 bg-gray-50">
        <div>
          <ProductsTable products={products} categories={categories} />
        </div>
      </main>
      <Footer
        total={total}
        pages={pages}
        numberOfProducts={products.length}
        currentPage={currentPage}
        limit={defaultLimit}
      />
    </>
  );
}
