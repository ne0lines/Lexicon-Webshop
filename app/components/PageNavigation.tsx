import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageNavigation({ pages }: { pages: number }) {
  const router = useRouter();
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const selectedStyle =
    "px-2.5 py-1 rounded border border-purple-600 transition-colors bg-purple-600 text-white text-xs";
  const unselectedStyle =
    "px-2.5 py-1 rounded border border-gray-300 transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-purple-200 hover:border-purple-200 hover:text-black text-xs";
  return (
    <nav>
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-purple-200 disabled:opacity-50 disabled:hover:bg-white"
        >
          Previous
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1)
          .filter((pageNum) => {
            if (pageNum === 1 || pageNum === pages) return true;

            return pageNum >= currentPage - 1 && pageNum <= currentPage + 1;
          })
          .map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={
                currentPage === pageNum ? selectedStyle : unselectedStyle
              }
            >
              {pageNum}
            </button>
          ))}

        <button
          onClick={() =>
            currentPage < pages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === pages}
          className="px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-purple-200 disabled:opacity-50 disabled:hover:bg-white"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
