import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CreateEventForm from "@/features/services/components/CreateEventForm/CreateEventForm";

const page = () => {
  return (
    <DashboardLayout title="Create Partner Event">
      <CreateEventForm />
    </DashboardLayout>
  );
};

export default page;
