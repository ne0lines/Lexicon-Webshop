import Link from 'next/link';
import type { Metadata } from "next";
import "./globals.css";
import { Barcode, ChartLine, ShoppingCart, Users, Settings } from 'lucide-react';
import { Inter } from 'next/font/google';
/*import { usePathname } from "next/navigation";*/

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const menuItems = [
  { href: "/products", label: "Products", color: "purple" },
  { href: "/analytics", label: "Analytics", color: "blue" },
  { href: "/orders", label: "Orders", color: "green" },
  { href: "/customers", label: "Customers", color: "yellow" },
  { href: "/settings", label: "Settings", color: "red" }
];

export const metadata: Metadata = {
  title: "Webbutik Admin",
  description: "Admin panel for Webbutik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
/*  const pathname = usePathname();*/
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <aside className="min-h-screen w-64 flex flex-col bg-white justify-between h-screen fixed left-0 top-0 z-40">
            <div>
              <div className="px-6 py-4 text-xl font-bold">
                Webbutiken<br />
                <span className="font-normal text-xs">Admin panel</span>
              </div>
              <nav className="mt-4">
                <ul className="gap-2 px-4 flex flex-col">
                  {menuItems.map((item) => {
                    /*const isActive = pathname === item.href;*/
                      return(
                      <li key={item.href}>
                        <Link
                          className={`flex gap-2 px-6 py-2 item-center gap-2 rounded-lg font-medium cursor-pointer ${
                            item.color ? `bg-white text-${item.color}-600` : ''}
                            ${ /*isActive ? `bg-${item.color}-600 text-white` : ''*/'' }
                          }`}
                          href={item.href}
                          >
                          {item.label}
                        </Link>
                      </li>
                    )}
                  )}
                </ul>
              </nav>
            </div> 
            <section className="px-6 py-4 flex items-center gap-2">
              <img src="http://placehold.co/40x40" alt="Admin user" className="rounded-full"/>
              <div>
                <div className="font-medium text-sm">Admin user</div>
                <div className="text-xs text-gray-500">admin@webbutiken.se</div>
              </div>
            </section>
          </aside>

              {children}
        </div>
      </body>
    </html>
  );
}
