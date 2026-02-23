
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '../types';

const colorClasses = {
    purple: {
        activeText: 'text-white hover:text-purple-100',
        activeBg: 'bg-purple-600 hover:bg-purple-700',
        inactiveText: 'text-purple-600 hover:text-purple-700',
        inactiveBg: 'bg-white hover:bg-purple-200',
    },
    blue: {
        activeText: 'text-white hover:text-blue-100',
        activeBg: 'bg-blue-600 hover:bg-blue-700',
        inactiveText: 'text-blue-600 hover:text-blue-700',
        inactiveBg: 'bg-white hover:bg-blue-200',
    },
    green: {
        activeText: 'text-white hover:text-green-100',
        activeBg: 'bg-green-600 hover:bg-green-700',
        inactiveText: 'text-green-600 hover:text-green-700',
        inactiveBg: 'bg-white hover:bg-green-200',
    },
    yellow: {
        activeText: 'text-white hover:text-yellow-100',
        activeBg: 'bg-yellow-500 hover:bg-yellow-600',
        inactiveText: 'text-yellow-600 hover:text-yellow-600',
        inactiveBg: 'bg-white hover:bg-yellow-200',
    },
    red: {
        activeText: 'text-white hover:text-red-100',
        activeBg: 'bg-red-600 hover:bg-red-700',
        inactiveText: 'text-red-600 hover:text-red-700',
        inactiveBg: 'bg-white hover:bg-red-200',
    }
} as const;

export default function SidebarMenuItem({ item }: Readonly<{ item: MenuItem }>) {
    const pathname = usePathname();
    const isActive = pathname === item.href;
    const Icon = item.icon;
    console.log({ pathname, isActive, item });

    const color = colorClasses[item.color] ?? colorClasses.purple;
    const linkTextClass = isActive ? color.activeText : color.inactiveText;
    const linkBgClass = isActive ? color.activeBg : color.inactiveBg;

    return (
        <li>
            <Link className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium ${linkTextClass} ${linkBgClass}`} href={item.href}>
                {Icon && <Icon size={18} />}
                {item.label}
            </Link>
        </li>
    );
}
