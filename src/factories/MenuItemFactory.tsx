import React from 'react';
import { MenuItem } from '@/types/sidebar';
import SidebarMenuItem from '@/components/sidebar/SidebarMenuItem';
import SidebarSubMenu from '@/components/sidebar/SidebarSubMenu';

export class MenuItemFactory {
  /**
   * 메뉴 타입에 따라 적절한 컴포넌트를 생성
   */
  static createMenuItem(item: MenuItem): React.ReactNode {
    // 하위 메뉴가 있는 경우 SubMenu 컴포넌트 반환
    if (item.children && item.children.length > 0) {
      return <SidebarSubMenu key={item.id} item={item} />;
    }

    // 일반 메뉴 항목인 경우 MenuItem 컴포넌트 반환
    return (
        <div key={item.id} className="px-3">
          <SidebarMenuItem item={item} />
        </div>
    );
  }

  /**
   * 메뉴 아이템 리스트를 생성
   */
  static createMenuItems(items: MenuItem[]): React.ReactNode[] {
    return items.map(item => this.createMenuItem(item));
  }
}