"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { checkPermissions } from "@/lib/helpers/checkPermissions";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { User } from "@/features/auth/types";

import MainLoader from "./atoms/MainLoader/MainLoader";

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean;
  redirectTo?: string;
  allowedUserIds?: string[];
  allowedRoles?: string[];
  alternativePermissions?: string[];
}

const hasExplicitAccess = (
  user: User | null,
  allowedUserIds?: string[],
  allowedRoles?: string[],
  alternativePermissions?: string[],
) =>
  Boolean(
    user &&
      (allowedUserIds?.includes(user.id) ||
        allowedRoles?.some(
          (role) => role.toLowerCase() === user.role_name?.trim().toLowerCase(),
        ) ||
        alternativePermissions?.some((permission) =>
          user.permissions?.includes(permission),
        )),
  );

export function ProtectedPage({
  children,
  requiredPermissions,
  requireAll = true,
  redirectTo = "/unauthorized",
  allowedUserIds,
  allowedRoles,
  alternativePermissions,
}: ProtectedPageProps) {
  const router = useRouter();
  useCurrentUser();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const hasAccess =
      hasExplicitAccess(
        user,
        allowedUserIds,
        allowedRoles,
        alternativePermissions,
      ) ||
      checkPermissions(user?.permissions, requiredPermissions, requireAll);

    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    requiredPermissions,
    requireAll,
    redirectTo,
    allowedUserIds,
    allowedRoles,
    alternativePermissions,
    router,
  ]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (!isAuthenticated) {
    return <MainLoader />;
  }

  const hasAccess =
    hasExplicitAccess(
      user,
      allowedUserIds,
      allowedRoles,
      alternativePermissions,
    ) ||
    checkPermissions(user?.permissions, requiredPermissions, requireAll);

  if (!hasAccess) {
    return <MainLoader />;
  }

  return <>{children}</>;
}
