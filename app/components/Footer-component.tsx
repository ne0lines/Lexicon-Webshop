export default function Footer({ total }: { total: number }) {
  return (
    <footer className="fixed bottom-0 left-64 right-0 z-30 flex items-center justify-between mt-4 gap-2 p-4 bg-white">
      <div className="flex h-8 text-xs text-gray-600 items-center">
        Showing X to Y of {total} products
      </div>
      <div>
        <nav>
          <div className="flex gap-2 text-xs">
            <button className="px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-purple-200 hover:text-black hover:border-purple-200 text-xs">
              Previous
            </button>
            <button className="px-2.5 py-1 rounded border border-purple-600 transition-colors bg-purple-600 text-white text-xs">
              1
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-300 transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-purple-200 hover:border-purple-200 hover:text-black text-xs">
              2
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-300 transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-purple-200 hover:border-purple-200 hover:text-black text-xs">
              3
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-purple-200 hover:text-black hover:border-purple-200 text-xs">
              Next
            </button>
          </div>
        </nav>
      </div>
    </footer>
  );
}
