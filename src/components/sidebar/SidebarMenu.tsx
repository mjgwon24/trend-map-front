import { MenuItem } from '@/types/sidebar';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarSubMenu from './SidebarSubMenu';

interface SidebarMenuProps {
    items: MenuItem[];
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
    return (
        <nav className="py-2">
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id}>
                        {item.children && item.children.length > 0 ? (
                            <SidebarSubMenu item={item} />
                        ) : (
                            <div className="px-3">
                                <SidebarMenuItem item={item} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}