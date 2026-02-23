import {
  SquarePen,
  Trash2,
} from "lucide-react";
import { ProductsResponse } from "../types";

function formatPrice(value: number) {
  return Math.trunc(Number(value)).toLocaleString("sv-SE");
}

type Product = ProductsResponse["products"][number];

export default function ProductsTableRow({
    product,
    onEdit,
}: Readonly<{
    product: Product;
    onEdit: (product: Product) => void;
}>) {
    function handleEditClick() {
        onEdit(product);
    }

    let stockStatusClass = "text-red-700";
    if ((product.stock ?? 0) > 10) {
        stockStatusClass = "text-green-700";
    } else if ((product.stock ?? 0) > 0) {
        stockStatusClass = "text-yellow-700";
    }

    return(
        <tr className="hover:bg-gray-100">
            <td className="px-3 py-2 w-auto align-middle">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-10"
            />
            </td>
            <td className="px-3 py-2 w-70 align-middle">
                <div className="flex flex-col">
                    <a
                        href={`/${product.id}`}
                        className="font-semibold text-blue-500 hover:text-blue-700 whitespace-nowrap truncate"
                    >
                        {product.title}
                    </a>
                    <span className="text-xs text-gray-400 whitespace-nowrap truncate">{product.sku}</span>
                </div>
            </td>
            <td className="px-3 py-2 align-middle text-gray-700 truncate">
                {product.category?.name}
            </td>
            <td className="px-3 py-2 align-middle text-right whitespace-nowrap">
                {formatPrice(product.price)} kr
            </td>
            <td className="px-3 py-2 align-middle text-center">
                {product.stock}
            </td>
            <td
            className={`px-3 py-2 align-middle text-center ${stockStatusClass}`}
            >
                {product.availabilityStatus}
            </td>
            <td className="px-3 py-2 align-middle text-right flex gap-1">
            <button
                type="button"
                onClick={handleEditClick}
                className="text-purple-600 bg-purple-200 p-1 rounded-md hover:bg-purple-700 hover:text-white"
            >
                <SquarePen className="w-4 h-4" />
            </button>
            <button type="button" className="text-red-600 bg-red-200 p-1 rounded-md hover:bg-red-700 hover:text-white">
                <Trash2 className="w-4 h-4" />
            </button>
            </td>
        </tr>
    );
}