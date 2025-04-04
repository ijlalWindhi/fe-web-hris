import useAuth from "@/stores/auth";

/**
 * Check if the user has a specific permission for a given module.
 * @param moduleName
 * @param permissionType
 * @returns boolean - true if the user has the permission, false otherwise.
 * @example
 * hasPermission("Dashboard", "view") // returns true or false based on the permission
 */
export function hasPermission(
  moduleName: string,
  permissionType: string,
): boolean {
  return useAuth
    .getState()
    .permission.some(
      (entry) =>
        entry.module.nama === moduleName && entry.permission === permissionType,
    );
}

/**
 * Get all permissions for a specific module.
 * @param moduleName
 * @returns string[] - An array of unique permissions for the specified module.
 * @example
 * getPermissionsByModule("Dashboard") // returns an array of permissions for the Dashboard module
 */
export function getPermissionsByModule(moduleName: string): string[] {
  const permissions = useAuth
    .getState()
    .permission.filter((entry) => entry.module.nama === moduleName)
    .map((entry) => entry.permission);

  return Array.from(new Set(permissions));
}
