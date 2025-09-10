import Link from 'next/link';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { getIconClasses, getMenuItemClasses } from '@/utils/sidebarStyles';

interface SidebarMenuItemProps {
    item: MenuItem;
    isSubmenu?: boolean;
}

export default function SidebarMenuItem({ item, isSubmenu = false }: SidebarMenuItemProps) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();

    const isActive = !!item.path && pathname === item.path;
    return (
        <Link
            href={item.path || '#'}
            className={getMenuItemClasses(isCollapsed, isActive, isSubmenu)}
        >
            <span className={getIconClasses(isCollapsed, isSubmenu)}>
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