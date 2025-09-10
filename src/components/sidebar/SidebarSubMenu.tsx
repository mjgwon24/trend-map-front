import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem";

interface SidebarSubMenuProps {
    item: MenuItem;
}

export default function SidebarSubMenu({ item }: SidebarSubMenuProps) {
    const { isCollapsed, toggleSubmenu, isSubmenuExpanded, currentActivePath } = useSidebar();
    const pathname = usePathname();
    const isExpanded = isSubmenuExpanded(item.id);

    // 현재 메뉴가 활성 상태인지 확인 (하위 메뉴 중 하나가 현재 경로와 일치하는 경우)
    const hasActiveChild = item.children?.some(child => child.path === pathname);

    // 접힌 상태일 때와 펼쳐진 상태일 때의 아이콘 크기 차별화
    const iconSizeClass = 'w-5 h-5';

    // 애니메이션 상태를 로컬에서 관리
    const [animationState, setAnimationState] = useState({
        isVisible: isExpanded,
        shouldAnimate: true
    });

    // 초기 및 경로 변경 시 하위 메뉴 자동 확장
    useEffect(() => {
        if (hasActiveChild && !isExpanded) {
            toggleSubmenu(item.id, true); // 강제로 열기 (다른 메뉴 닫지 않음)
            setAnimationState({
                isVisible: true,
                shouldAnimate: false
            });
        }
    }, [pathname, hasActiveChild, isExpanded, item.id]);

    // 확장 상태가 변경될 때 애니메이션 상태 업데이트
    useEffect(() => {
        setAnimationState(prev => ({
            isVisible: isExpanded,
            shouldAnimate: prev.isVisible !== isExpanded // 상태가 변경된 경우만 애니메이션 적용
        }));
    }, [isExpanded]);

    // 하위 메뉴 토글 핸들러
    const handleToggleSubmenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSubmenu(item.id);
    };

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
        <div className="px-3">
            {/* 메뉴 헤더 - 활성 상태 표시 추가 */}
            <button
                onClick={handleToggleSubmenu}
                className={`
                    w-full flex items-center justify-between
                    ${isCollapsed ? 'py-3 px-0' : 'py-2 px-4'} mb-1 rounded-md
                    ${hasActiveChild
                    ? 'text-white bg-gray-700' // 하위 메뉴 활성 상태
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'} 
                    transition-colors
                    ${isCollapsed ? 'justify-center' : ''}
                `}
            >
                <div className="flex items-center">
                  <span className={iconSizeClass}>
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
            {(isExpanded || isCollapsed) && (
                <motion.ul
                    key={`submenu-${item.id}`}
                    variants={subMenuVariants}
                    initial={isExpanded ? "open" : "closed"}
                    animate={isExpanded ? "open" : "closed"}
                    exit="closed"
                    layout
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