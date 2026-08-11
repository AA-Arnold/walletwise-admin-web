"use client";

import AdminInfoLoader from "@/components/atoms/skeleton/AdminInfoLoader";
import AppBreadcrumb from "@/components/molecules/AppBreadcrumb/AppBreadcrumb";
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import { useGetEventInfo } from "../../hooks/useGetEventInfo";

const EditEventInfoWrapper = ({ eventId }: { eventId: string }) => {
  const { data, isLoading } = useGetEventInfo(eventId);

  if (isLoading) return <AdminInfoLoader />;

  const breadcrumb = [
    { label: "Event Management", href: "/services/events" },
    {
      label: data?.event?.title || "Event Details",
      href: `/services/events/info/${eventId}`,
    },
    { label: "Edit Event" },
  ];

  return (
    <div className="space-y-6">
      <AppBreadcrumb items={breadcrumb} />
      <CreateEventForm eventId={eventId} />
    </div>
  );
};

export default EditEventInfoWrapper;
