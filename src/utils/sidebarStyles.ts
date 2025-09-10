/**
 * 사이드바 메뉴 컴포넌트에 사용되는 공통 스타일 유틸리티
 */

// 메뉴 아이콘 크기 및 스타일 클래스
export const getIconClasses = (isCollapsed: boolean, isSubmenu = false) => {
  if (isSubmenu) return 'hidden';
  return `w-5 h-5 flex items-center justify-center`;
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

// 헤더 컨테이너 클래스
export const getHeaderContainerClasses = (isCollapsed: boolean) => {
  const baseClasses = "relative flex items-center h-16 px-3 border-b border-gray-800";
  return `${baseClasses} ${isCollapsed ? 'justify-center' : 'justify-between'}`;
};

// 로고 래퍼 클래스
export const getLogoWrapperClasses = (isCollapsed: boolean) => {
  return isCollapsed
      ? "flex justify-center w-full cursor-pointer rounded-md hover:bg-gray-800 transition-colors relative p-1"
      : "";
};

// 토글 버튼 클래스
export const getToggleButtonClasses = () => {
  return "p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors";
};

// 툴팁 클래스
export const getTooltipClasses = () => {
  return "absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50";
};
