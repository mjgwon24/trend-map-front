'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import Logo from '@/components/common/Logo';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    getHeaderContainerClasses,
    getLogoWrapperClasses,
    getToggleButtonClasses,
    getTooltipClasses
} from '@/utils/sidebarStyles';

export default function SidebarHeader() {
    const { isCollapsed, toggleCollapse, preserveSidebarState } = useSidebar();
    const [showTooltip, setShowTooltip] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // 하이드레이션 완료 후 클라이언트 사이드 로직 활성화
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const logoSize = "md";

    // 로고 클릭 핸들러
    const handleLogoClick = (e: React.MouseEvent) => {
        if (!isMounted) return;

        if (isCollapsed) {
            e.preventDefault();
            preserveSidebarState();
            toggleCollapse();
        }
    };

    // 토글 버튼 클릭 핸들러
    const handleToggleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        preserveSidebarState();
        toggleCollapse();
    };

    return (
        <div className={`${getHeaderContainerClasses(isCollapsed)} overflow-hidden`}>
            {/* 로고 영역 */}
            <div
                className={`${getLogoWrapperClasses(isCollapsed)} overflow-hidden`}
                onClick={handleLogoClick}
                onMouseEnter={() => isCollapsed && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label={isCollapsed ? "메뉴 펼치기" : undefined}
                role="button"
                tabIndex={0}
            >
                <Link href="/" onClick={e => isCollapsed && isMounted && e.preventDefault()}>
                    <Logo
                        showText={!isCollapsed}
                        size={logoSize}
                        fontWeight="bold"
                    />
                </Link>
                {/* 툴팁 */}
                {isMounted && isCollapsed && showTooltip && (
                    <div className={getTooltipClasses()}>
                        Open Sidebar
                    </div>
                )}
            </div>

            {/* 토글 버튼 */}
            {isMounted && !isCollapsed && (
                <button
                    onClick={handleToggleClick}
                    className={getToggleButtonClasses()}
                    aria-label="메뉴 접기"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="11 17 6 12 11 7"></polyline>
                        <polyline points="18 17 13 12 18 7"></polyline>
                    </svg>
                </button>
            )}
        </div>
    );
}