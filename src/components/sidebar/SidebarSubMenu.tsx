import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem";

interface SidebarSubMenuProps {
    item: MenuItem;
}

export default function SidebarSubMenu({ item }: SidebarSubMenuProps) {
    const { isCollapsed, toggleSubmenu, isSubmenuExpanded } = useSidebar();
    const pathname = usePathname();
    const isExpanded = isSubmenuExpanded(item.id);

    // 현재 경로가 하위 메뉴 중 하나와 일치하면 자동으로 펼치기
    useEffect(() => {
        if (item.children && item.children.some(child => child.path === pathname)) {
            if (!isExpanded) {
                toggleSubmenu(item.id);
            }
        }
    }, [pathname, item, isExpanded, toggleSubmenu]);

    return (
        <div className="px-3">
            {/* 메뉴 헤더 */}
            <button
                onClick={() => toggleSubmenu(item.id)}
                className={`
                    w-full flex items-center justify-between py-2 px-4 mb-1 rounded-md
          text-gray-300 hover:bg-gray-800 hover:text-white transition-colors
                    ${isCollapsed ? 'justify-center px-2' : ''}
        `}
            >
                <div className="flex items-center">
          <span className="w-5 h-5">
            {item.icon}
          </span>

                    {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                    )}
                </div>

                {!isCollapsed && (
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
                )}
            </button>

            {/* 하위 메뉴 */}
            <AnimatePresence>
                {(isExpanded || isCollapsed) && (
                    <motion.ul
                        initial={isCollapsed ? {} : { height: 0, opacity: 0 }}
                        animate={isCollapsed ? {} : { height: 'auto', opacity: 1 }}
                        exit={isCollapsed ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`overflow-hidden ${isCollapsed
                            ? 'absolute left-full top-0 ml-2 bg-sidebar-bg rounded-md shadow-lg py-1 z-10'
                            : 'pl-2'}`}
                    >
                        {item.children?.map(child => (
                            <li key={child.id}>
                                <SidebarMenuItem item={child} isSubmenu={!isCollapsed} />
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}