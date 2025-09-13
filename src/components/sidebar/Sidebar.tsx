'use client';

import { useEffect } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import { mainMenuItems, bottomMenuItems } from '@/utils/menuConfig';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  // 모바일에서 페이지 이동 시 사이드바 닫기
  useEffect(() => {
    if (isMobileOpen) {
      toggleMobile();
    }
  }, [pathname, isMobileOpen, toggleMobile]);

  // 모바일용 오버레이 클릭 시 사이드바 닫기
  const handleOverlayClick = () => {
    if (isMobileOpen) {
      toggleMobile();
    }
  };

  return (
      <>
        {/* 모바일 오버레이 */}
        {isMobileOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity"
                onClick={handleOverlayClick}
            />
        )}

        {/* 사이드바 메인 컨테이너 */}
        <aside
            className={`
          fixed top-0 left-0 h-full z-40 
          bg-[#121212] text-white
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-60'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                overflow-hidden
        `}
        >
          <SidebarHeader />

          <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600">
            <div className="py-2">
              <SidebarMenu items={mainMenuItems} />
            </div>
            <div className="mt-auto">
              <SidebarMenu items={bottomMenuItems} />
            </div>
          </div>

          <SidebarFooter />
        </aside>
      </>
  );
}