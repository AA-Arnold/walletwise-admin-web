import { User } from "../types";

export const EVENT_MANAGEMENT_ADMIN_ID =
  "a162bc79-13ff-4906-bc18-3d7545bb9b69";

export const EVENT_MANAGEMENT_PERMISSIONS = [
  "manager_management.read",
  "manager_management.write",
  "manager_management.create",
];

export const hasEventManagementAccess = (user?: User | null) => {
  if (!user) return false;

  return (
    user.id === EVENT_MANAGEMENT_ADMIN_ID ||
    user.role_name?.trim().toLowerCase() === "manager" ||
    EVENT_MANAGEMENT_PERMISSIONS.some((permission) =>
      user.permissions?.includes(permission),
    )
  );
};
