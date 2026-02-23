export default function FooterShowingProductsNum({
  total,
  numberOfProducts,
  currentPage,
  limit,
}: {
  total: number;
  numberOfProducts: number;
  currentPage: number;
  limit: number;
}) {
  const startingNum = limit * (currentPage - 1);
  return (
    <div className="flex h-8 text-xs text-gray-600 items-center">
      Showing {startingNum} to {startingNum + numberOfProducts} of {total}{" "}
      products
    </div>
  );
}
