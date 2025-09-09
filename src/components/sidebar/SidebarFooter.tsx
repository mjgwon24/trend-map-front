import { useTheme } from '@/contexts/ThemeContext';
import { useSidebar } from '@/contexts/SidebarContext';
import Toggle from '@/components/ui/Toggle';

export default function SidebarFooter() {
    const { mode, setMode } = useTheme();
    const { isCollapsed } = useSidebar();

    // 다크 모드 토글
    const toggleDarkMode = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    };

    return (
        <div className="border-t border-gray-800 px-4 py-3">
            {/* Upgrade 버튼 */}
            <button className="w-full mb-4 bg-gradient-to-r from-primary-dark to-primary-light rounded-lg py-2 px-4 text-white font-medium flex items-center justify-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </span>
                {!isCollapsed && (
                    <>
                        <span>Upgrade</span>
                        <span className="text-xs block ml-1 opacity-75">Unlock all Trend Map features</span>
                    </>
                )}
            </button>

            {/* 다크 모드 토글 */}
            <div className="flex items-center justify-between">
                {!isCollapsed && <span className="text-gray-300 text-sm">Dark Mode</span>}
                <Toggle
                    isActive={mode === 'dark'}
                    onChange={toggleDarkMode}
                    size="md"
                    label="Dark mode toggle"
                    className={isCollapsed ? 'mx-auto mb-2' : 'mb-2'}
                />
            </div>
        </div>
    );
}