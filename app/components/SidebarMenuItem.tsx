
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '../types';

export default function SidebarMenuItem({ item }: Readonly<{ item: MenuItem }>) {
    const pathname = usePathname();
    const isActive = pathname === item.href;
    const Icon = item.icon;

    let linkTextClass = '';
    let linkBgClass = '';
    if (isActive) {
        linkTextClass = `text-white hover:text-${item.color}-200`; 
        linkBgClass = `bg-${item.color}-600 hover:bg-${item.color}-700`;
    } else {
        linkTextClass = `text-${item.color}-500 hover:text-${item.color}-700`;
        linkBgClass = `bg-white hover:bg-${item.color}-100`;
    }

    return (
        <li>
            <Link className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium cursor-pointer ${linkTextClass} ${linkBgClass}`} href={item.href}>
                <Icon size={18} />
                {item.label}
            </Link>
        </li>
    );
}
