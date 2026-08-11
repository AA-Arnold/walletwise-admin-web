"use client";

import { use } from "react";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import EditEventInfoWrapper from "@/features/services/components/EditEventInfoWrapper/EditEventInfoWrapper";

const EditEventPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = use(params);
  return (
    <DashboardLayout title="Edit Partner Event">
      <EditEventInfoWrapper eventId={eventId} />
    </DashboardLayout>
  );
};

export default EditEventPage;
