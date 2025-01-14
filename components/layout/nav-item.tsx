import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { INavItem } from "@/types";
import { cn } from "@/utils/utils";

// Types
interface NavItemProps {
  menuItem: INavItem;
  isActive: boolean;
  isOpen?: boolean;
  toggleSubMenu?: (menuName: string) => void;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  pathname: string;
  navigationMode: "sidebar" | "header";
}

// Subcomponents
const NavLink: React.FC<{
  href: string;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ href, className, onClick, children }) => (
  <Link href={href} onClick={onClick} className={className}>
    {children}
  </Link>
);

const NavItemTitle: React.FC<{
  title: string;
  isActive: boolean;
}> = React.memo(({ title, isActive }) => {
  const titleClasses = isActive
    ? "text-primary lg:text-white text-nowrap"
    : "text-gray-500 text-nowrap";

  return (
    <span className={`text-sm font-normal capitalize ${titleClasses}`}>
      {title}
    </span>
  );
});
NavItemTitle.displayName = "NavItemTitle";

const SubMenuItems: React.FC<{
  subItems: INavItem[];
  pathname: string;
  onItemClick?: () => void;
  mode: "header" | "sidebar";
  isSidebarOpen?: boolean;
}> = React.memo(({ subItems, pathname, onItemClick, mode, isSidebarOpen }) => {
  const getSubItemClasses = useCallback(
    (isActive: boolean) => {
      if (mode === "header") {
        return `
        flex w-full flex-row items-center gap-2 px-4 py-2.5 border-b last:border-0 
        last:rounded-b-3xl first:rounded-t-3xl
        ${isActive ? "" : "hover:bg-gray-50"}
      `;
      }
      return `flex w-full flex-row items-center gap-2 rounded-lg ${
        isSidebarOpen ? "p-4" : "px-4 py-2.5"
      }
    ${
      isActive
        ? "bg-blue-50 text-blue-500 border-l-4 border-blue-500"
        : "hover:bg-gray-50"
    }`;
    },
    [mode, isSidebarOpen],
  );

  return (
    <>
      {subItems.map((subItem) => (
        <NavLink
          key={subItem.path}
          href={subItem.path}
          onClick={onItemClick}
          className={getSubItemClasses(pathname === subItem.path)}
        >
          {mode === "sidebar" && <div className=" w-2 h-2 rounded-full" />}
          <span
            className={`text-sm font-normal capitalize ${
              mode === "header"
                ? pathname === subItem.path
                  ? "text-white"
                  : "text-gray-500"
                : pathname === subItem.path
                  ? "text-blue-500"
                  : "text-gray-500"
            }`}
          >
            {subItem.title}
          </span>
        </NavLink>
      ))}
    </>
  );
});
SubMenuItems.displayName = "SubMenuItems";

// Main Component
const NavItem: React.FC<NavItemProps> = ({
  menuItem,
  isActive,
  isOpen,
  toggleSubMenu,
  isSidebarOpen,
  toggleSidebar,
  pathname,
  navigationMode,
}) => {
  // variables
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const haveSubItems = menuItem.sub && menuItem.sub.length > 0;

  // memoized variables
  const navItemClasses = useMemo(
    () => `
    flex flex-row items-center gap-2 rounded-full
    ${isActive ? "" : "hover:bg-gray-50"}
    ${isSidebarOpen ? "w-full" : "w-full min-w-12 justify-center"}
    ${haveSubItems ? "cursor-pointer justify-between" : ""}
  `,
    [isActive, isSidebarOpen, haveSubItems],
  );

  const navItemContent = useMemo(() => {
    const shouldShowTitle = isSidebarOpen || navigationMode === "header";
    const shouldShowChevron =
      ((isSidebarOpen && isMobile) || navigationMode === "header") &&
      haveSubItems;

    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2.5",
          isActive && !isMobile ? "bg-primary" : "bg-white hover:bg-gray-100",
          isMobile && "!bg-transparent",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          {shouldShowTitle && (
            <NavItemTitle title={menuItem.title} isActive={isActive} />
          )}
        </div>

        {shouldShowChevron && (
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-all duration-300 
              ${isOpen || isDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </div>
    );
  }, [
    isSidebarOpen,
    navigationMode,
    menuItem,
    isActive,
    isMobile,
    isOpen,
    isDropdownOpen,
    haveSubItems,
  ]);

  // functions
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navigationMode === "header"
      ) {
        setIsDropdownOpen(false);
      }
    },
    [navigationMode],
  );

  const handleNavItemClick = useCallback(() => {
    if (navigationMode === "header" && haveSubItems) {
      setIsDropdownOpen((prev) => !prev);
    } else if (toggleSubMenu && haveSubItems) {
      toggleSubMenu(menuItem.title);
    }
  }, [navigationMode, menuItem, toggleSubMenu]);

  // lifecycle
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${navigationMode === "sidebar" ? "w-full" : ""}`}
    >
      {!haveSubItems ? (
        <NavLink
          href={menuItem.path}
          onClick={toggleSidebar}
          className={navItemClasses}
        >
          {navItemContent}
        </NavLink>
      ) : (
        <div className="w-full">
          {(navigationMode === "header" ||
            (isMobile && navigationMode === "sidebar")) && (
            <div onClick={handleNavItemClick} className={navItemClasses}>
              {navItemContent}
            </div>
          )}

          {/* Dropdown for header mode */}
          {navigationMode === "header" && isDropdownOpen && haveSubItems && (
            <div className="absolute z-10 mt-2 w-[160px] rounded-3xl bg-white shadow-lg border">
              <SubMenuItems
                subItems={menuItem.sub}
                pathname={pathname}
                onItemClick={() => {
                  setIsDropdownOpen(false);
                  if (toggleSidebar) toggleSidebar();
                }}
                mode="header"
              />
            </div>
          )}

          {/* Sidebar submenu - Desktop */}
          {navigationMode === "sidebar" && haveSubItems && !isMobile && (
            <div className="mt-2 flex flex-col gap-2 w-full">
              <SubMenuItems
                subItems={menuItem.sub}
                pathname={pathname}
                onItemClick={toggleSidebar}
                mode="sidebar"
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          )}

          {/* Sidebar submenu - Mobile */}
          {navigationMode === "sidebar" &&
            haveSubItems &&
            isMobile &&
            isOpen && (
              <div className="mt-2 flex flex-col gap-2 w-full">
                <SubMenuItems
                  subItems={menuItem.sub}
                  pathname={pathname}
                  onItemClick={toggleSidebar}
                  mode="sidebar"
                  isSidebarOpen={isSidebarOpen}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default React.memo(NavItem);
