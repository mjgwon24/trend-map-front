'use client';

import { useSidebar } from "@/contexts/SidebarContext";
import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { isCollapsed, isMobileOpen } = useSidebar();
  
  return (
    <main 
      className={`
        flex-1 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'md:ml-20' : 'md:ml-60'} 
        ml-0
      `}
    >
      {children}
    </main>
  );
}