import type { Category, ProductsResponse } from "./types";
import Header from "./components/header";
import Footer from "./components/Footer-component";
import ProductsTable from "./components/ProductsTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const DEFAULT_LIMIT = 20;

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ page?: string }>;
}>) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [allProductsResponse, pagedProductsResponse, categories] = await Promise.all([
    fetch(`${API_URL}/products/?_sort=id&_order=desc&_expand=category`).then((res) =>
      res.json(),
    ) as Promise<ProductsResponse>,
    fetch(
      `${API_URL}/products/?_limit=${DEFAULT_LIMIT}&_sort=id&_order=desc&_expand=category&_page=${currentPage}`,
    ).then((res) => res.json()) as Promise<ProductsResponse>,
    fetch(`${API_URL}/categories`).then((res) => res.json()) as Promise<Category[]>,
  ]);

  const { products: allProducts, total: totalProducts } = allProductsResponse;
  const { products, total, pages } = pagedProductsResponse;
  
  return (
    <>
      <Header products={allProducts} total={totalProducts} />
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
        limit={DEFAULT_LIMIT}
      />
    </>
  );
}
