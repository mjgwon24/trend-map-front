import Link from 'next/link';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { getIconClasses, getMenuItemClasses } from '@/utils/sidebarStyles';
import { useMenuNavigation } from '@/services/MenuNavigationService';
import { useState, useEffect, memo } from 'react';

interface SidebarMenuItemProps {
    item: MenuItem;
    isSubmenu?: boolean;
}

export default memo(function SidebarMenuItem({ item, isSubmenu = false }: SidebarMenuItemProps) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();
    const { navigateTo } = useMenuNavigation();
    const [isMounted, setIsMounted] = useState(false);

    // 하이드레이션 완료 후 클라이언트 사이드 로직 활성화
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isActive = !!item.path && pathname === item.path;

    // 링크 클릭 핸들러 - NavigationService 사용
    const handleClick = (e: React.MouseEvent) => {
        // 경로가 없거나 현재 활성화된 링크면 아무 것도 하지 않음
        if (!item.path || item.path === '#' || isActive) {
            e.preventDefault();
            return;
        }

        // 클라이언트 사이드에서만 프로그래밍 방식 네비게이션 사용
        if (isMounted) {
            // MenuNavigationService의 navigateTo 호출
            // SidebarContext에서 경로 변경 감지 후 사이드바 상태 변경
            navigateTo(item.path, e);
        }
    };

    return (
        <Link
            href={item.path || '#'}
            onClick={handleClick}
            className={`${getMenuItemClasses(isCollapsed, isActive, isSubmenu)} overflow-hidden`}
            data-itemid={item.id}
            data-active={isActive}
            // 외부 링크가 아닌 경우에만 prefetch 활성화
            prefetch={item.path && !item.path.startsWith('http') ? true : false}
            replace={false} // 페이지 이력 보존
        >
            <span className={getIconClasses(isCollapsed, isSubmenu)}>
        {item.icon}
      </span>

            {(!isCollapsed || isSubmenu) && (
                <span className={`
                    ml-3 
                    whitespace-nowrap overflow-hidden text-ellipsis
                    transition-opacity duration-300
                    ${isSubmenu ? 'text-sm' : ''}
                `}>
                    {item.label}
                </span>
            )}

            {item.badge && !isCollapsed && (
                <span className={`
                    ml-auto px-2 py-0.5 text-xs rounded-full
                    flex-shrink-0
                    ${item.badge.color === 'indigo' ? 'bg-primary' : `bg-${item.badge.color}`}
                    text-white
                `}>
                    {item.badge.text}
                </span>
            )}
        </Link>
    );
});
