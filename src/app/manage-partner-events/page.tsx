import { Suspense } from "react";

import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ManagePartnersWrapper from "@/features/partners/components/ManagePartnersWrapper/ManagePartnersWrapper";
import { hasEventManagementAccess } from "@/features/auth/constants/eventManagementAccess";

const ManagePartnerEventsPage = () => (
  <ProtectedPage
    requiredPermissions={[
      "admin_management.read",
      "admin_management.write",
      "admin_management.create",
    ]}
    requireAll={false}
    accessOverride={hasEventManagementAccess}
  >
    <DashboardLayout title="Manage Partner Events">
      <Suspense fallback={<MainLoader />}>
        <ManagePartnersWrapper />
      </Suspense>
    </DashboardLayout>
  </ProtectedPage>
);

export default ManagePartnerEventsPage;
