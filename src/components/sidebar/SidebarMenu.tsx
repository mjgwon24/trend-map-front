import { MenuItem } from '@/types/sidebar';
import { MenuItemFactory } from '@/factories/MenuItemFactory';
interface SidebarMenuProps {
    items: MenuItem[];
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
    return (
        <nav className="py-2">
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id}>
                        {MenuItemFactory.createMenuItem(item)}
                    </li>
                ))}
            </ul>
        </nav>
    );
}