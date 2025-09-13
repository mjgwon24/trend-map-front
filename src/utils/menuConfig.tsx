import { MenuItem } from '@/types/sidebar';
import {
  AnalyticsIcon,
  CommunityIcon, DashboardIcon,
  HelpIcon,
  MarketIcon,
  PortfolioIcon,
  SettingsIcon,
  WalletIcon
} from "@/components/icons";
import React from "react";

// UserRole 타입 추가
export type UserRole = 'guest' | 'user' | 'premium' | 'admin';

export const mainMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    id: 'market',
    label: 'Market Summary',
    icon: <MarketIcon />,
    path: '/market',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: <PortfolioIcon />,
    children: [
      {
        id: 'stocks',
        label: 'Stocks',
        path: '/portfolio/stocks',
      },
      {
        id: 'bonds',
        label: 'Bonds',
        path: '/portfolio/bonds',
      },
      {
        id: 'mutual-funds',
        label: 'Mutual Funds',
        path: '/portfolio/mutual-funds',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    path: '/analytics',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: <WalletIcon />,
    path: '/wallet',
  },
  {
    id: 'community',
    label: 'Community',
    icon: <CommunityIcon />,
    path: '/community',
  },
];

export const bottomMenuItems: MenuItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: <HelpIcon />,
    path: '/help',
  },
];

// 권한별 메뉴 필터링 함수
export const filterMenuByRole = (
    menuItems: MenuItem[],
    userRoles: UserRole[] = ['guest']
): MenuItem[] => {
  return menuItems.filter((item) => {
    // roles가 없으면 모든 사용자가 접근 가능
    if (!item.roles || item.roles.length === 0) return true;

    // 역할 기반 접근 확인
    const hasAccess = item.roles.some(role => userRoles.includes(role));

    // 하위 메뉴 필터링
    if (hasAccess && item.children && item.children.length > 0) {
      item.children = filterMenuByRole(item.children, userRoles);
    }

    return hasAccess;
  });
};