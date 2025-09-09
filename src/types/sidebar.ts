import React, { ReactNode } from 'react';

export type UserRole = 'guest' | 'user' | 'premium' | 'admin';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  roles?: UserRole[];
  badge?: {
    text: string;
    color: string;
  };
}

export interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  expandedMenus: string[];
  currentActivePath: string;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  toggleSubmenu: (id: string, forceOpen?: boolean) => void;
  isSubmenuExpanded: (id: string) => boolean;
}