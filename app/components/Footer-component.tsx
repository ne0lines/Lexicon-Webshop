"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageNavigation from "./PageNavigation";

export default function Footer({
  total,
  pages,
}: {
  total: number;
  pages: number;
}) {
  return (
    <footer className="fixed bottom-0 left-64 right-0 z-30 flex items-center justify-between mt-4 gap-2 p-4 bg-white">
      <div className="flex h-8 text-xs text-gray-600 items-center">
        Showing X to Y of {total} products
      </div>
      <div>
        <PageNavigation pages={pages} />
      </div>
    </footer>
  );
}
