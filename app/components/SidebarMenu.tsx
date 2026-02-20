
"use client";

import SidebarMenuItem from './SidebarMenuItem';
import { Barcode, ChartLine, ShoppingCart, Users, Settings } from 'lucide-react';

const menuItems = [
    {
        href: '/',
        label: 'Products',
        icon: Barcode,
        color: 'purple',
    },
    {
        href: '/analytics',
        label: 'Analytics',
        icon: ChartLine,
        color: 'blue',
    },
    {
        href: '/orders',
        label: 'Orders',
        icon: ShoppingCart,
        color: 'green',
    },
    {
        href: '/customers',
        label: 'Customers',
        icon: Users,
        color: 'yellow',
    },
    {
        href: '/settings',
        label: 'Settings',
        icon: Settings,
        color: 'red',
    },
] as const;

export default function SidebarMenu() {
    return (
        <ul className="gap-2 px-4 flex flex-col">
            {menuItems.map((item) => {
                return (
                    <SidebarMenuItem key={item.href} item={item} />
                );
            })}
        </ul>
    );
}