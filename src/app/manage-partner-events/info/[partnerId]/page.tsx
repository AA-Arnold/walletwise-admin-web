"use client";

import { use } from "react";

import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import PartnerInfoWrapper from "@/features/partners/components/PartnerInfoWrapper/PartnerInfoWrapper";
import { hasEventManagementAccess } from "@/features/auth/constants/eventManagementAccess";

const PartnerInfoPage = ({
  params,
}: {
  params: Promise<{ partnerId: string }>;
}) => {
  const { partnerId } = use(params);

  return (
    <ProtectedPage
      requiredPermissions={[
        "admin_management.read",
        "admin_management.write",
        "admin_management.create",
      ]}
      requireAll={false}
      accessOverride={hasEventManagementAccess}
    >
      <DashboardLayout title="Partner Info">
        <PartnerInfoWrapper partnerId={partnerId} />
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default PartnerInfoPage;
