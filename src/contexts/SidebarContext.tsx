'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SidebarState } from '@/types/sidebar';

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

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // 모바일 여부 확인
  const [isMobile, setIsMobile] = useState(false);

  // 사이드바 상태
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

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

  // 하위 메뉴 토글
  const toggleSubmenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) 
        ? prev.filter(menuId => menuId !== id)
        : [...prev, id]
    );
  };

  // 하위 메뉴 확장 여부 확인
  const isSubmenuExpanded = (id: string) => {
    return expandedMenus.includes(id);
  };

  const value: SidebarState = {
    isCollapsed,
    isMobileOpen,
    expandedMenus,
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