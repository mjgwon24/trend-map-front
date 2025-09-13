import { MenuItem } from '@/types/sidebar';
import { mainMenuItems, bottomMenuItems } from '@/utils/menuConfig';

/**
 * 메뉴 경로 관리 서비스
 * 경로-메뉴 ID 매핑 및 관련 유틸리티 함수 제공
 */
class MenuPathService {
  private menuPathMap: Map<string, string> = new Map();
  private menuParentMap: Map<string, string> = new Map();
  private allMenuItems: MenuItem[] = [];
  private static instance: MenuPathService;

  public static getInstance(): MenuPathService {
    if (!MenuPathService.instance) {
      MenuPathService.instance = new MenuPathService();
    }
    return MenuPathService.instance;
  }

  private constructor() {
    this.allMenuItems = [...mainMenuItems, ...bottomMenuItems];
    this.buildMenuMaps(this.allMenuItems);
  }

  /**
   * 모든 메뉴 항목을 순회하며 경로-ID 및 부모-자식 관계 맵 구축
   */
  private buildMenuMaps(items: MenuItem[], parentId?: string) {
    items.forEach(item => {
      // 경로가 있는 항목은 경로-ID 맵에 추가
      if (item.path) {
        this.menuPathMap.set(item.path, item.id);
      }

      // 부모 ID가 있으면 부모-자식 관계 맵에 추가
      if (parentId) {
        this.menuParentMap.set(item.id, parentId);
      }

      // 자식 항목이 있으면 재귀적으로 처리
      if (item.children && item.children.length > 0) {
        this.buildMenuMaps(item.children, item.id);
      }
    });
  }

  /**
   * 경로에 해당하는 메뉴 ID 찾기
   */
  getMenuIdByPath(path: string): string | undefined {
    return this.menuPathMap.get(path);
  }

  /**
   * 메뉴 ID의 모든 부모 ID 찾기 (루트까지)
   */
  getParentChain(menuId: string): string[] {
    const result: string[] = [];
    let currentId = menuId;

    while (this.menuParentMap.has(currentId)) {
      const parentId = this.menuParentMap.get(currentId);
      if (parentId) {
        result.push(parentId);
        currentId = parentId;
      } else {
        break;
      }
    }

    return result;
  }

  /**
   * 경로에 해당하는 모든 부모 메뉴 ID 찾기
   */
  getParentMenusByPath(path: string): string[] {
    const menuId = this.getMenuIdByPath(path);
    if (!menuId) return [];

    return this.getParentChain(menuId);
  }

  /**
   * 경로에 직접 해당하는 메뉴가 하위 메뉴인지 확인
   */
  isSubmenuItem(path: string): boolean {
    const menuId = this.getMenuIdByPath(path);
    return menuId ? this.menuParentMap.has(menuId) : false;
  }

  /**
   * 메뉴가 특정 경로의 하위 메뉴인지 확인
   */
  isChildOfPath(menuId: string, parentPath: string): boolean {
    const parentId = this.getMenuIdByPath(parentPath);
    if (!parentId) return false;

    const parents = this.getParentChain(menuId);
    return parents.includes(parentId);
  }
}

export const menuPathService = MenuPathService.getInstance();