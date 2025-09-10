import { useSidebar } from '@/contexts/SidebarContext';
import Logo from '@/components/common/Logo';
import Link from 'next/link';
import { useState } from 'react';
import {
    getHeaderContainerClasses,
    getLogoWrapperClasses,
    getToggleButtonClasses,
    getTooltipClasses
} from '@/utils/sidebarStyles';

export default function SidebarHeader() {
    const { isCollapsed, toggleCollapse } = useSidebar();
    const [showTooltip, setShowTooltip] = useState(false);

    const logoSize = "md";
    const handleLogoClick = (e: React.MouseEvent) => {
        if (isCollapsed) {
            e.preventDefault();
            toggleCollapse();
        }
    };

    return (
        <div className={getHeaderContainerClasses(isCollapsed)}>
            {/* 로고 영역 */}
            <div
                className={getLogoWrapperClasses(isCollapsed)}
                onClick={handleLogoClick}
                onMouseEnter={() => isCollapsed && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label={isCollapsed ? "메뉴 펼치기" : undefined}
            >
                <Link href="/" onClick={e => isCollapsed && e.preventDefault()}>
                    <Logo
                        showText={!isCollapsed}
                        size={logoSize}
                        fontWeight="bold"
                    />
                </Link>
                {/* 툴팁 */}
                {isCollapsed && showTooltip && (
                    <div className={getTooltipClasses()}>
                        Open Sidebar
                    </div>
                )}
            </div>

            {/* 토글 버튼 */}
            {!isCollapsed && (
                <button
                    onClick={toggleCollapse}
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