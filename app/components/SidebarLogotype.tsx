import Link from 'next/link';

export default function SidebarLogotype() {
    return (
        <>
            <Link href="/" className="text-black hover:text-blue-500">Webbutiken</Link><br />
            <span className="font-normal text-xs text-gray-500">Admin panel</span>
        </>
    );
}