import React from 'react';
import { MenuItem } from '@/types/sidebar';
import SidebarMenuItem from '@/components/sidebar/SidebarMenuItem';
import SidebarSubMenu from '@/components/sidebar/SidebarSubMenu';

export class MenuItemFactory {
  /**
   * 메뉴 타입에 따라 적절한 컴포넌트를 생성
   */
  static createMenuItem(item: MenuItem): React.ReactNode {
    if (item.children && item.children.length > 0) {
      return <SidebarSubMenu key={item.id} item={item} />;
    } else {
      return (
        <div key={item.id} className="px-3">
          <SidebarMenuItem item={item} />
        </div>
      );
    }
  }

  /**
   * 메뉴 아이템 리스트를 생성
   */
  static createMenuItems(items: MenuItem[]): React.ReactNode[] {
    return items.map(item => this.createMenuItem(item));
  }
}