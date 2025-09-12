import { useRouter } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import { useCallback } from 'react';

/**
 * 메뉴 네비게이션 서비스
 * - 페이지 이동 및 사이드바 상태 관리 통합
 */
export function useMenuNavigation() {
  const router = useRouter();
  const { isCollapsed } = useSidebar();

  // 경로 이동 처리 함수
  // 페이지 이동 시 사이드바는 SidebarContext에서 관리하므로 여기서는 경로 이동만 담당
  const navigateTo = useCallback((path: string, e?: React.MouseEvent) => {
    if (!path || path === '#') return;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    window.requestAnimationFrame(() => {
      router.push(path);
    });
  }, [router]);

  return {
    navigateTo,
    isCollapsed
  };
}