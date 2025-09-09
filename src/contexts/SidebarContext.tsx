'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SidebarState } from '@/types/sidebar';
import { usePathname } from 'next/navigation';
import { menuPathService } from '@/services/MenuPathService';

const SidebarContext = createContext<SidebarState | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

// 경로로부터 부모 메뉴 ID를 찾는 헬퍼 함수
const findParentMenuByPath = (pathname: string, menuItems: any[]): string | null => {
  // 메뉴 설정 파일 불러오기
  const { mainMenuItems, bottomMenuItems } = require('@/utils/menuConfig');
  const allMenus = [...mainMenuItems, ...bottomMenuItems];

  // 하위 메뉴에서 경로 검색
  for (const menu of allMenus) {
    if (menu.children && menu.children.some((child: any) => child.path === pathname)) {
      return menu.id;
    }
  }

  return null;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const pathname = usePathname();
  // 모바일 여부 확인
  const [isMobile, setIsMobile] = useState(false);

  // 사이드바 상태
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // 현재 활성 경로 상태 추가
  const [currentActivePath, setCurrentActivePath] = useState<string>(pathname || '/');

  // 경로 변경 감지 및 부모 메뉴 자동 확장
  useEffect(() => {
    if (pathname) {
      setCurrentActivePath(pathname);

      // 현재 경로에 해당하는 모든 부모 메뉴 찾기
      const parentMenuIds = menuPathService.getParentMenusByPath(pathname);

      // 부모 메뉴들이 있다면 해당 메뉴들 확장
      if (parentMenuIds.length > 0) {
        setExpandedMenus(prev => {
          // 기존 확장 메뉴와 새로운 부모 메뉴 합치기
          const newExpandedMenus = [...prev];
          parentMenuIds.forEach(id => {
            if (!newExpandedMenus.includes(id)) {
              newExpandedMenus.push(id);
            }
          });
          return newExpandedMenus;
        });
      }
    }
  }, [pathname]);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md 브레이크포인트
    };

    // 초기 설정
    checkMobile();

    // 윈도우 크기 변경 감지
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 사이드바 토글
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
    // 모바일에서 사이드바 접을 때 하위 메뉴도 함께 닫기
    if (isMobile) {
      setExpandedMenus([]);
    }
  };

  // 모바일 사이드바 토글
  const toggleMobile = () => {
    setIsMobileOpen(prev => !prev);
  };

  // 하위 메뉴 토글 - 수정된 버전
  const toggleSubmenu = (id: string, forceOpen?: boolean) => {
    setExpandedMenus(prev => {
      // 이미 확장된 메뉴인지 확인
      const isCurrentlyExpanded = prev.includes(id);

      // forceOpen이 true면 무조건 열기
      if (forceOpen === true) {
        return isCurrentlyExpanded ? prev : [...prev, id];
      }

      if (isCurrentlyExpanded && !forceOpen) {
        // 이미 열려있고 강제 오픈이 아니면 닫기
        return prev.filter(menuId => menuId !== id);
      } else {
        // 새 메뉴를 열 때는 다른 메뉴를 닫고 현재 메뉴만 열기
        return [id];
      }
    });
  };

  // 하위 메뉴 확장 여부 확인
  const isSubmenuExpanded = (id: string) => {
    return expandedMenus.includes(id);
  };

  const value: SidebarState = {
    isCollapsed,
    isMobileOpen,
    expandedMenus,
    currentActivePath,
    toggleCollapse,
    toggleMobile,
    toggleSubmenu,
    isSubmenuExpanded,
  };

  return (
      <SidebarContext.Provider value={value}>
        {children}
      </SidebarContext.Provider>
  );
};