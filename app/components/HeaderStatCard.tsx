import { CircleCheck, CircleX, Package2, Plus, TriangleAlert } from "lucide-react";
import { Product } from "../types";

interface StatCardProps {
    products: Product[]
    total: number;

}
// Each card will recieve a differenet prop
export default function StatCard({ products: allProducts, total: totalProducts }: StatCardProps) {

    

    // Check if the products is "in stock"
    // If a stock value is 0 or it is undefined, filter it out (all of the below use this)
    const inStock = allProducts.filter((p) => (p.stock ?? 0) > 0).length;

    // Check if products is in "low stock"
    const lowStock = allProducts.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 20).length;

    // Check if products is _out of stock_
    const outOfStock = allProducts.filter((p) => (p.stock ?? 0) === 0).length;


    return (
        <>

            <section className="grid grid-cols-4 gap-6 mb-8 mt-24 px-8 py-4 bg-gray-50">
                <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-1">Total products</span>
                        <span className="block text-2xl font-bold">{totalProducts}</span>
                    </div>
                    <div className="bg-purple-100 rounded-md p-2 flex items-center justify-center text-purple-500">
                        <Package2 />
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-1">In stock</span>
                        <span className="block text-2xl font-bold">{inStock}</span>
                    </div>
                    <div className="bg-green-100 rounded-md p-2 flex items-center justify-center text-green-500">
                        <CircleCheck />
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-1">Low stock</span>
                        <span className="block text-2xl font-bold">{lowStock}</span>
                    </div>
                    <div className="bg-yellow-100 rounded-md p-2 flex items-center justify-center text-yellow-500">
                        <TriangleAlert />
                    </div>
                </div>
                <div className="bg-white rounded shadow p-4 flex  items-center justify-between">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-1">Out of stock</span>
                        <span className="block text-2xl font-bold">{outOfStock}</span>
                    </div>
                    <div className="bg-pink-100 rounded-md p-2 flex items-center justify-center text-pink-500">
                        <CircleX />
                    </div>
                </div>
            </section>
        </>
    )
}