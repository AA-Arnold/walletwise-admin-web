"use client";

import Link from "next/link";

import ConfirmAction from "@/components/molecules/ConfirmAction/ConfirmAction";
import ColumnActionDropdown from "@/components/molecules/ColumnActionDropdown/ColumnActionDropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeletePartner } from "../../hooks/useDeletePartner";
import { Partner } from "../../types";

const PartnerActionCell = ({ partner }: { partner: Partner }) => {
  const deleteAction = useDeletePartner();

  return (
    <>
      <ColumnActionDropdown>
        <DropdownMenuItem asChild>
          <Link href={`/manage-partner-events/info/${partner.id}`}>
            View partner details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={(event) => {
            event.preventDefault();
            deleteAction.setIsOpen(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </ColumnActionDropdown>
      <ConfirmAction
        open={deleteAction.isOpen}
        setOpen={deleteAction.setIsOpen}
        onCancel={deleteAction.onCancel}
        onConfirm={() => deleteAction.deletePartner({ partnerId: partner.id })}
        isPending={deleteAction.isPending}
        title="Are You Sure You Want to Delete This Partner?"
        description="Deleting this partner will permanently remove their account. This action cannot be undone."
      />
    </>
  );
};

export default PartnerActionCell;
