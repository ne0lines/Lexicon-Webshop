import FooterShowingProductsNum from "./FooterShowingProductsNum";
import FooterNav from "./FooterNav";

export default function Footer({
  total,
  pages,
  numberOfProducts,
  currentPage,
  limit,
}: {
  total: number;
  pages: number;
  numberOfProducts: number;
  currentPage: number;
  limit: number;
}) {
  return (
    <footer className="fixed bottom-0 left-64 right-0 z-30 flex items-center justify-between mt-4 gap-2 p-4 bg-white">
      <FooterShowingProductsNum
        total={total}
        currentPage={currentPage}
        numberOfProducts={numberOfProducts}
        limit={limit}
      />
      <div>
        <FooterNav pages={pages} currentPage={currentPage} />
      </div>
    </footer>
  );
}
