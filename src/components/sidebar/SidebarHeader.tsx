import { useSidebar } from '@/contexts/SidebarContext';
import Logo from '@/components/common/Logo';
import Link from 'next/link';

export default function SidebarHeader() {
    const { isCollapsed, toggleCollapse } = useSidebar();

    return (
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link href="/">
                <Logo
                    showText={!isCollapsed}
                    size="md"
                    fontWeight="bold"
                />
            </Link>

            <button
                onClick={toggleCollapse}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label={isCollapsed ? "확장하기" : "접기"}
            >
                {isCollapsed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="11 17 6 12 11 7"></polyline>
                        <polyline points="18 17 13 12 18 7"></polyline>
                    </svg>
                )}
            </button>
        </div>
    );
}