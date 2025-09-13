import { useState, useEffect, useCallback } from 'react';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem";
import { getIconClasses, getSubmenuButtonClasses, getMenuContainerClasses } from '@/utils/sidebarStyles';

interface SidebarSubMenuProps {
    item: MenuItem;
}

export default function SidebarSubMenu({ item }: SidebarSubMenuProps) {
    const { isCollapsed, toggleSubmenu, isSubmenuExpanded } = useSidebar();
    const pathname = usePathname();
    const isExpanded = isSubmenuExpanded(item.id);
    const [isMounted, setIsMounted] = useState(false);

    // 하이드레이션 안전장치
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 현재 메뉴가 활성 상태인지 확인
    const hasActiveChild = item.children?.some(child => child.path === pathname);

    // 애니메이션 상태 관리
    const [animationState, setAnimationState] = useState({
        isVisible: false,  // 초기값을 false로 설정하여 하이드레이션 불일치 방지
        shouldAnimate: false
    });

    // 초기 및 경로 변경 시 하위 메뉴 자동 확장 (클라이언트 사이드 전용)
    useEffect(() => {
        // 하이드레이션 이전에는 실행하지 않음
        if (!isMounted) return;

        // 중요: isCollapsed가 true인 경우(사이드바가 닫힌 경우)에는
        // 하위 메뉴 자동 확장을 하지 않도록 조건 추가
        if (hasActiveChild && !isExpanded && !isCollapsed) {
            // 사이드바가 열려 있을 때만 하위 메뉴 자동 확장
            toggleSubmenu(item.id, true);
        }
    }, [pathname, hasActiveChild, isExpanded, item.id, isMounted, toggleSubmenu, isCollapsed]);

    // 확장 상태 변경 시 애니메이션 상태 업데이트 (클라이언트 사이드 전용)
    useEffect(() => {
        if (!isMounted) return;

        setAnimationState(prev => ({
            isVisible: isExpanded,
            shouldAnimate: prev.isVisible !== isExpanded
        }));
    }, [isExpanded, isMounted]);

    // 하위 메뉴 토글 핸들러
    const handleToggleSubmenu = useCallback((e: React.MouseEvent) => {
        if (!isMounted) return;

        e.preventDefault();
        e.stopPropagation();
        toggleSubmenu(item.id);
    }, [isMounted, toggleSubmenu, item.id]);

    // 애니메이션 설정
    const subMenuVariants = {
        open: {
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.2, when: "beforeChildren" }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.2, when: "afterChildren" }
        }
    };

    return (
        <div className={`${getMenuContainerClasses()} overflow-hidden`}>
            {/* 메뉴 헤더 */}
            <button
                onClick={handleToggleSubmenu}
                className={`${getSubmenuButtonClasses(isCollapsed, !!hasActiveChild)} overflow-hidden`}
                data-submenu-id={item.id}
            >
                <div className="flex items-center overflow-hidden">
                    <span className={getIconClasses(isCollapsed, false)}>
            {item.icon}
          </span>

                    {!isCollapsed && (
                        <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.label}
                        </span>
                    )}
                </div>

                {!isCollapsed && (
                    <span className={`transform transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </span>
                )}
            </button>

            {/* 하위 메뉴 */}
            {isMounted && (isExpanded || isCollapsed) && (
                <motion.ul
                    key={`submenu-${item.id}`}
                    variants={subMenuVariants}
                    initial="closed"
                    animate={isExpanded ? "open" : "closed"}
                    exit="closed"
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
        </div>
    );
}