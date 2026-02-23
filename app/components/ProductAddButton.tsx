"use client";
import Link from 'next/link';
import { Plus } from "lucide-react";

export const OPEN_CREATE_PRODUCT_EVENT = "products:create-open";

function handleOpenCreateClick() {
  globalThis.dispatchEvent(new CustomEvent(OPEN_CREATE_PRODUCT_EVENT));
}

export default function AddProductButton() {
  return (
    <Link
      href="#"
      onClick={handleOpenCreateClick}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-purple-700"
    >
      <Plus /> Add product
    </Link>
  );
}
