"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {
  isRestrictedEventAdmin,
  RESTRICTED_EVENT_PATH,
} from "@/features/auth/constants/restrictedAccess";

import MainLoader from "./atoms/MainLoader/MainLoader";

const RestrictedEventAdminGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading } = useCurrentUser();
  const user = useSelector((state: RootState) => state.auth.user);

  const shouldRedirect =
    isRestrictedEventAdmin(user?.id) && pathname !== RESTRICTED_EVENT_PATH;

  useEffect(() => {
    if (!isLoading && shouldRedirect) {
      router.replace(RESTRICTED_EVENT_PATH);
    }
  }, [isLoading, router, shouldRedirect]);

  if (isLoading || shouldRedirect) {
    return <MainLoader />;
  }

  return <>{children}</>;
};

export default RestrictedEventAdminGuard;
