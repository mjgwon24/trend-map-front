'use client';

import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';

type SubmenuState = {
  [key: string]: boolean;
};

interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  expandedSubmenus: SubmenuState;
  currentActivePath: string | null;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  toggleSubmenu: (id: string, forceOpen?: boolean) => void;
  isSubmenuExpanded: (id: string) => boolean;
  preserveSidebarState: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // localStorage 업데이트 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 하이드레이션 안전 래퍼 컴포넌트
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 클라이언트 사이드 렌더링 확인
  const [isClient, setIsClient] = useState(false);
  const [didInitialize, setDidInitialize] = useState(false);

  // 수동 토글 추적을 위한 ref
  const manualToggleRef = useRef<boolean>(false);
  const previousPathRef = useRef<string | null>(null);

  // 하이드레이션 후에만 클라이언트 사이드 상태 활성화
  useEffect(() => {
    setIsClient(true);
  }, []);

  // localStorage를 사용한 사이드바 상태 관리
  // 기본값을 true(접힌 상태)로 설정
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebarCollapsed', true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState<SubmenuState>({});
  const [currentActivePath, setCurrentActivePath] = useState<string | null>(null);

  // 페이지 이동 추적
  const pathname = usePathname();

  // 현재 경로 추적 및 사이드바 상태 관리
  useEffect(() => {
    if (!isClient) return;

    // 경로가 변경된 경우에만 처리
    if (previousPathRef.current !== pathname) {
      setCurrentActivePath(pathname);
      previousPathRef.current = pathname;

      // 수동 토글이 아닌 경우에만 사이드바를 닫음
      if (!manualToggleRef.current) {
        // 페이지 이동 시 사이드바를 닫힘 상태로 변경
        setIsCollapsed(true);
      }

      // 수동 토글 플래그 리셋
      manualToggleRef.current = false;

      // 모바일 사이드바는 항상 닫음
      if (isMobileOpen) {
        setIsMobileOpen(false);
      }
    }

    // 초기화 완료 표시
    if (!didInitialize) {
      setDidInitialize(true);
    }
  }, [pathname, isClient, isMobileOpen, setIsCollapsed, didInitialize]);

  // 토글 함수들
  const toggleCollapse = useCallback(() => {
    // 수동 토글 표시
    manualToggleRef.current = true;

    // 상태 토글
    setIsCollapsed(prev => !prev);
  }, [setIsCollapsed, isCollapsed]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const toggleSubmenu = useCallback((id: string, forceOpen?: boolean) => {
    setExpandedSubmenus(prev => {
      const newState = forceOpen !== undefined ? forceOpen : !prev[id];
      return { ...prev, [id]: newState };
    });
  }, []);

  const isSubmenuExpanded = useCallback((id: string) => {
    return !!expandedSubmenus[id];
  }, [expandedSubmenus]);

  // 상태 보존 함수
  const preserveSidebarState = useCallback(() => {
    manualToggleRef.current = true;
  }, []);

  // 서버 사이드 렌더링용 초기값
  const initialContextValue = useMemo<SidebarContextType>(() => ({
    isCollapsed: true, // 서버에서도 접힌 상태로 렌더링
    isMobileOpen: false,
    expandedSubmenus: {},
    currentActivePath: null,
    toggleCollapse: () => {},
    toggleMobile: () => {},
    toggleSubmenu: () => {},
    isSubmenuExpanded: () => false,
    preserveSidebarState: () => {}
  }), []);

  // 클라이언트 사이드 렌더링 후 실제 값 사용
  const contextValue = useMemo<SidebarContextType>(() => (
      isClient ? {
        isCollapsed,
        isMobileOpen,
        expandedSubmenus,
        currentActivePath,
        toggleCollapse,
        toggleMobile,
        toggleSubmenu,
        isSubmenuExpanded,
        preserveSidebarState
      } : initialContextValue
  ), [
    isClient, isCollapsed, isMobileOpen, expandedSubmenus,
    currentActivePath, toggleCollapse, toggleMobile,
    toggleSubmenu, isSubmenuExpanded, preserveSidebarState,
    initialContextValue
  ]);

  return (
      <SidebarContext.Provider value={contextValue}>
        {children}
      </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
