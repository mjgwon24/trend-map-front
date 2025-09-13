import { MenuItem } from '@/types/sidebar';
import {
  AnalyticsIcon,
  DashboardIcon,
  HelpIcon,
  SettingsIcon,
  TrendRankingIcon,
  KeywordAnalysisIcon,
  DevelopersIcon
} from "@/components/icons";
import React from "react";

// UserRole 타입 추가
export type UserRole = 'guest' | 'user' | 'premium' | 'admin';

export const mainMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Board',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    id: 'trend-ranking',
    label: 'Ranking',
    icon: <TrendRankingIcon />,
    children: [
      {
        id: 'daily-trend-ranking',
        label: 'Daily Trend Rankings',
        path: '/trend-ranking/daily',
      },
      {
        id: 'trend-detail',
        label: 'Trends Detail',
        path: '/trend-ranking/detail',
      },
    ],
  },
  {
    id: 'keyword-analysis',
    label: 'Keyword',
    icon: <KeywordAnalysisIcon />,
    path: '/keyword-analysis',
  },
  {
    id: 'developers',
    label: 'Developer',
    icon: <DevelopersIcon />,
    path: '/developers',
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
    label: 'Help',
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