import { Funnel, Plus, Search } from "lucide-react";
import StatCard from "./HeaderStatCard";
import { Product } from "../types";
import AddProductButton from "./ProductAddButton";

interface Header {
    total: number;
    products: Product[]
}

export default function Header({ total, products }: Header) {

    return (
        <>
            <header className="fixed left-64 top-0 right-0 z-30">

                <section className="px-8 py-4 bg-white flex items-center justify-between">
                    <div >
                        <h1 className="text-xl font-bold">Product management</h1>
                        <span className="text-gray-500 text-sm">Manage your store inventory</span>
                    </div>
                    <AddProductButton />
                </section>

                <StatCard total={total} products={products} />


                <form className="flex items-center text-xs gap-4 mb-6 border-gray-300 px-8 py-4 bg-white">
                    <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center flex-1">
                        <Search className="w-4 h-4 pink-500" />
                        <label htmlFor="search-input" className="hidden" >Sök bland produkter</label>
                        <input name="search-input" placeholder="Search products..." id="search-input" />
                    </div>
                    <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
                        <label htmlFor="category" className="hidden">Välj kategori</label>
                        <select id="category">
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="2">Category 3</option>
                        </select>
                    </div>
                    <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
                        <label htmlFor="status" className="hidden">Välj lagerstatus</label>
                        <select id="category">
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                    </div>
                    <div className="border-gray-300 border-2 rounded-lg px-4 py-2 flex items-center">
                        <Funnel className="w-4 h-4" />
                        <label htmlFor="filter" className="hidden">Filtrera produkter</label>
                        <button type="button" id="filter">Filter</button>
                    </div>
                </form>
            </header>
        </>
    )
}