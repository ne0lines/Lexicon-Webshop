import type { ProductsResponse } from "./types";
import { Plus, Barcode, ChartLine, ShoppingCart, Users, Settings, Package2, CircleCheck, TriangleAlert, CircleX } from 'lucide-react';

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home() {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());


console.log(products);

  return (
    <>
      <aside className="h-full fixed p-6">
        <div className="flex flex-col">
          <span className="font-bold text-xl">Webbutiken</span>
          <span className="font-normal text-xs clear-left">Admin panel</span>
        </div>
        <nav className="p-6">
          <ul className="flex flex-col">
            <li className="flex h-8 gap-4"><Barcode/>Products</li>
            <li className="flex h-8 gap-4"><ChartLine/>Analytics</li>
            <li className="flex h-8 gap-4"><ShoppingCart/>Orders</li>
            <li className="flex h-8 gap-4"><Users/>Customers</li>
            <li className="flex h-8 gap-4"><Settings/>Settings</li>
          </ul>
        </nav>
        <section id="user-info">
          <span>avatar</span>
          <strong>username</strong>
          <span>user e-mail</span>
        </section>
      </aside>
      <header className="w-full fixed pl-70">
        <h1>Product management</h1>
        <span>Manage your store inventory</span>
        <button><Plus/> Add product</button>
        <div>
          <span>Total products</span><Package2 />
          <span>248</span>
          </div> 
        <div>
          <span>In stock</span><CircleCheck />
          <span>189</span>
          </div>
        <div>
          <span>Low stock</span><TriangleAlert />
          <span>34</span>
          </div>
        <div>
          <span>Out of stock</span><CircleX />
          <span>25</span>
          </div>
      </header>
      <main className="w-full pl-70 pt-80">
        <section>
          <label htmlFor="search-input">Sök bland produkter</label>
          <input name="search-input" id="search-input" />
          <label htmlFor="category" >Välj kategori</label>
          <select id="category">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2">3</option>
          </select>
          <label htmlFor="status" >Välj lagerstatus</label>
          <select id="category">
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="2">Low</option>
          </select>
          <label htmlFor="filter">Filtrera produkter</label>
          <button type="button" id="filter">Filter</button>
        </section>
        
        <h1>Products</h1>
        <div>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</div>
        <div class="flex">
          <div >Showing X to Y of Z products</div>
          <div>
            <nav>
              <ul>
                <li>Previous</li>
                <li class="active">1</li>
                <li>2</li>
                <li>3</li>
                <li>Next</li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}