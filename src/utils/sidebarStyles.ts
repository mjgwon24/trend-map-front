/**
 * 사이드바 메뉴 컴포넌트에 사용되는 공통 스타일 유틸리티
 */

// 메뉴 아이콘 크기 및 스타일 클래스
export const getIconClasses = (isCollapsed: boolean, isSubmenu = false) => {
  if (isSubmenu) return 'hidden';
  return `w-6 h-6 flex items-center justify-center`;
};

// 메뉴 컨테이너 스타일 클래스
export const getMenuItemClasses = (
  isCollapsed: boolean, 
  isActive: boolean,
  isSubmenu = false
) => {
  const baseClasses = "flex items-center rounded-md mb-1 transition-colors";
  const paddingClasses = isCollapsed && !isSubmenu 
    ? "py-3 justify-center" 
    : `py-2 ${isSubmenu ? 'pl-10' : 'pl-4'} pr-3`;
  const stateClasses = isActive
    ? "bg-primary text-white"
    : "text-gray-300 hover:bg-gray-800 hover:text-white";

  return `${baseClasses} ${paddingClasses} ${stateClasses}`;
};

// 하위 메뉴 버튼 스타일 클래스
export const getSubmenuButtonClasses = (
  isCollapsed: boolean,
  hasActiveChild: boolean
) => {
  const baseClasses = "w-full flex items-center rounded-md mb-1 transition-colors";
  const paddingClasses = isCollapsed
    ? "py-3 justify-center"
    : "py-2 px-4 justify-between";
  const stateClasses = hasActiveChild
    ? "text-white bg-gray-700"
    : "text-gray-300 hover:bg-gray-800 hover:text-white";

  return `${baseClasses} ${paddingClasses} ${stateClasses}`;
};

// 메뉴 컨테이너 패딩
export const getMenuContainerClasses = () => {
  return "px-3";
};