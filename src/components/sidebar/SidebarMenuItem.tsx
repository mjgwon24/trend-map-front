import Link from 'next/link';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';

interface SidebarMenuItemProps {
    item: MenuItem;
    isSubmenu?: boolean;
}

export default function SidebarMenuItem({ item, isSubmenu = false }: SidebarMenuItemProps) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();

    const isActive = item.path && pathname === item.path;
    const indentClass = isSubmenu ? 'pl-10' : 'pl-4';

    return (
        <Link
            href={item.path || '#'}
            className={`
        flex items-center py-2 px-3 ${indentClass} mb-1 rounded-md
        ${isActive
                ? 'bg-primary text-white' // 활성 메뉴
                : 'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'}
        ${isCollapsed && !isSubmenu ? 'justify-center' : ''}
      `}
        >
      <span className={isSubmenu ? 'hidden' : 'w-5 h-5'}>
        {item.icon}
      </span>

            {(!isCollapsed || isSubmenu) && (
                <span className={`ml-3 transition-opacity ${isSubmenu ? 'text-sm' : ''}`}>
          {item.label}
        </span>
            )}

            {item.badge && !isCollapsed && (
                <span className={`
          ml-auto px-2 py-0.5 text-xs rounded-full
          ${item.badge.color === 'indigo' ? 'bg-primary' : `bg-${item.badge.color}`}
          text-white
        `}>
          {item.badge.text}
        </span>
            )}
        </Link>
    );
}