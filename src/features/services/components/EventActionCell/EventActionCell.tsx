"use client";

import Link from "next/link";
import { useState } from "react";

import ColumnActionDropdown from "@/components/molecules/ColumnActionDropdown/ColumnActionDropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import ConfirmAction from "@/components/molecules/ConfirmAction/ConfirmAction";
import { useUpdatePartnerEventStatus } from "../../hooks/useUpdatePartnerEventStatus";

const EventActionCell = ({
  eventId,
  status,
}: {
  eventId: string;
  status?: string;
}) => {
  const [nextStatus, setNextStatus] = useState<
    "Approved" | "Declined" | null
  >(null);
  const { isOpen, onCancel, isPending, setIsOpen, deleteEvent } =
    useDeleteEvent();
  const statusUpdate = useUpdatePartnerEventStatus();
  const normalizedStatus = status?.trim().toLowerCase();
  const canApprove =
    normalizedStatus === "pending" || normalizedStatus === "declined";
  const canDecline =
    normalizedStatus === "pending" || normalizedStatus === "approved";

  return (
    <>
      <ColumnActionDropdown>
        <DropdownMenuItem>
          <Link
            className="w-full"
            href={`/services/events/info/${eventId}`}
          >
            View
          </Link>
        </DropdownMenuItem>
        {canApprove && (
          <DropdownMenuItem>
            <button
              className="w-full cursor-pointer text-left text-emerald-600"
              onClick={() => setNextStatus("Approved")}
            >
              Approve
            </button>
          </DropdownMenuItem>
        )}
        {canDecline && (
          <DropdownMenuItem>
            <button
              className="w-full cursor-pointer text-left text-red-500"
              onClick={() => setNextStatus("Declined")}
            >
              Decline
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link
            className="w-full"
            href={`/services/events/info/${eventId}/edit`}
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="w-full cursor-pointer text-left text-red-500"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Delete
          </button>
        </DropdownMenuItem>
      </ColumnActionDropdown>
      <ConfirmAction
        isPending={statusUpdate.isPending}
        open={Boolean(nextStatus)}
        setOpen={(open) => {
          if (!open) setNextStatus(null);
        }}
        onCancel={() => setNextStatus(null)}
        onConfirm={() => {
          if (!nextStatus) return;
          statusUpdate.mutate(
            { eventId, status: nextStatus },
            { onSuccess: () => setNextStatus(null) },
          );
        }}
        title={`${nextStatus === "Approved" ? "Approve" : "Decline"} event`}
        description={`Are you sure you want to ${nextStatus?.toLowerCase()} this event?`}
      />
      <ConfirmAction
        isPending={isPending}
        open={isOpen}
        setOpen={setIsOpen}
        onCancel={onCancel}
        onConfirm={() => deleteEvent({ eventId })}
        title="Delete event"
        description="Are you sure you want to delete this event?"
      />
    </>
  );
};

export default EventActionCell;
