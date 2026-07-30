"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/atoms/Button/Button";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import AppBreadcrumb from "@/components/molecules/AppBreadcrumb/AppBreadcrumb";
import ConfirmAction from "@/components/molecules/ConfirmAction/ConfirmAction";
import { useDeletePartner } from "../../hooks/useDeletePartner";
import { useGetPartnerInfo } from "../../hooks/useGetPartnerInfo";
import { useUpdatePartnerStatus } from "../../hooks/useUpdatePartnerStatus";
import PartnerEventsTable from "../PartnerEventsTable/PartnerEventsTable";
import PartnerInfoHeader from "../PartnerInfoHeader/PartnerInfoHeader";
import PartnerInfoLoader from "../PartnerInfoLoader/PartnerInfoLoader";

const PartnerInfoWrapper = ({ partnerId }: { partnerId: string }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPartnerInfo(partnerId);
  const deleteAction = useDeletePartner(() =>
    router.push("/manage-partner-events"),
  );
  const isInactive = ["inactive", "deactivated", "suspended"].includes(
    data?.status?.toLowerCase() || "",
  );
  const statusAction = useUpdatePartnerStatus(partnerId, isInactive);

  if (isLoading) return <PartnerInfoLoader />;

  if (isError || !data) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center dark:border-gray-700">
        <h1 className="text-xl font-semibold dark:text-white">
          Partner information unavailable
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The partner could not be loaded. Please return to the partner list and
          try again.
        </p>
        <div className="mt-5">
          <Button
            width="w-auto"
            onClick={() => router.push("/manage-partner-events")}
          >
            Back to partners
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle
          title="Partner Details"
          description="View partner information and events"
        />
        <div className="flex flex-wrap gap-3">
          <Button
            width="w-auto"
            bgColor={
              isInactive
                ? "bg-emerald-600 text-white"
                : "bg-amber-500 text-white"
            }
            bgHoverColor={
              isInactive ? "hover:bg-emerald-700" : "hover:bg-amber-600"
            }
            onClick={() => statusAction.setIsOpen(true)}
          >
            {isInactive ? "Activate Partner" : "Deactivate Partner"}
          </Button>
          <Button
            width="w-auto"
            bgColor="bg-red-600 text-white"
            bgHoverColor="hover:bg-red-700"
            onClick={() => deleteAction.setIsOpen(true)}
          >
            Delete Partner
          </Button>
        </div>
      </div>

      <AppBreadcrumb
        items={[
          { label: "Manage Partner Events", href: "/manage-partner-events" },
          { label: "Partner Details" },
        ]}
      />
      <PartnerInfoHeader partner={data} />

      <section className="space-y-4 rounded-xl border bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Partner Events
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            All events created by {data.company_name}
          </p>
        </div>
        <PartnerEventsTable events={data.events} />
      </section>

      <ConfirmAction
        open={deleteAction.isOpen}
        setOpen={deleteAction.setIsOpen}
        onCancel={deleteAction.onCancel}
        onConfirm={() => deleteAction.deletePartner({ partnerId })}
        isPending={deleteAction.isPending}
        title="Delete Partner"
        description="This will permanently remove the partner account. This action cannot be undone."
      />
      <ConfirmAction
        open={statusAction.isOpen}
        setOpen={statusAction.setIsOpen}
        onCancel={statusAction.onCancel}
        onConfirm={statusAction.updateStatus}
        isPending={statusAction.isPending}
        title={`${isInactive ? "Activate" : "Deactivate"} Partner`}
        description={
          isInactive
            ? "This partner will regain access to their account."
            : "This partner will lose access until their account is activated again."
        }
      />
    </div>
  );
};

export default PartnerInfoWrapper;
