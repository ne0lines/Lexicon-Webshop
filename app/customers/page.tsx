import AddProductButton from "../components/ProductAddButton";

export default function CustomersPage() {
  return (
    <>
        <header className="fixed left-64 top-0 right-0 z-30">
            <section className="px-8 py-4 bg-white flex items-center justify-between">
                <div >
                    <h1 className="text-xl font-bold">Customers</h1>
                    <span className="text-gray-500 text-sm">Manage your customer relationships</span>
                </div>
                <AddProductButton />
            </section>
        </header>
        <main className="w-full pl-70 pt-8 pb-15 bg-gray-50 min-h-screen">
        </main>
    </>
  );
}
