'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/products/new-listing', label: 'New Listing' },
] as const;

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {menuItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className={cn(
            "inline-flex items-center px-1 pt-1 text-sm font-medium",
            pathname === item.href ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
} 