import { Suspense } from "react";

import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import { ProtectedPage } from "@/components/ProtectedPage";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ManagePartnersWrapper from "@/features/partners/components/ManagePartnersWrapper/ManagePartnersWrapper";
import {
  EVENT_MANAGEMENT_ADMIN_ID,
  EVENT_MANAGEMENT_PERMISSIONS,
} from "@/features/auth/constants/eventManagementAccess";

const ManagePartnerEventsPage = () => (
  <ProtectedPage
    requiredPermissions={[
      "admin_management.read",
      "admin_management.write",
      "admin_management.create",
    ]}
    requireAll={false}
    allowedUserIds={[EVENT_MANAGEMENT_ADMIN_ID]}
    allowedRoles={["manager"]}
    alternativePermissions={EVENT_MANAGEMENT_PERMISSIONS}
  >
    <DashboardLayout title="Manage Partner Events">
      <Suspense fallback={<MainLoader />}>
        <ManagePartnersWrapper />
      </Suspense>
    </DashboardLayout>
  </ProtectedPage>
);

export default ManagePartnerEventsPage;
