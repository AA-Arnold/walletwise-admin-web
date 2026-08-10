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
  accessOverride?: (user?: User | null) => boolean;
}

export function ProtectedPage({
  children,
  requiredPermissions,
  requireAll = true,
  redirectTo = "/unauthorized",
  accessOverride,
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
      accessOverride?.(user) ||
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
    accessOverride,
    router,
  ]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (!isAuthenticated) {
    return <MainLoader />;
  }

  const hasAccess =
    accessOverride?.(user) ||
    checkPermissions(user?.permissions, requiredPermissions, requireAll);

  if (!hasAccess) {
    return <MainLoader />;
  }

  return <>{children}</>;
}
