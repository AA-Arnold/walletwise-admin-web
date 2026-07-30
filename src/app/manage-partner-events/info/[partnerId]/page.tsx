"use client";

import { use } from "react";

import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import PartnerInfoWrapper from "@/features/partners/components/PartnerInfoWrapper/PartnerInfoWrapper";

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
    >
      <DashboardLayout title="Partner Info">
        <PartnerInfoWrapper partnerId={partnerId} />
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default PartnerInfoPage;
