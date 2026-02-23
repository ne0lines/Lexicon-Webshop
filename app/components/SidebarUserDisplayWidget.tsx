import Link from 'next/link';
export default function SidebarUserDisplayWidget() {
    return(
        <section className="px-6 py-4 flex items-center gap-2">
            <img src="https://placehold.co/40x40" alt="Admin user" className="rounded-full"/>
            <div>
            <Link href="#" className="font-medium text-sm hover:text-blue-500">Admin user</Link>
            <div className="text-xs text-gray-500">admin@webbutiken.se</div>
            </div>
        </section>
    );
}