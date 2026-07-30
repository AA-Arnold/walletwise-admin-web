import { FormEvent } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Handshake } from "lucide-react";

import TableWrapper from "@/components/organisms/TableWrapper/TableWrapper";
import { Partner } from "../../types";
import { PartnerColumns } from "./Column";

interface PartnersTableProps {
  partners: Partner[];
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: (totalPages: number) => void;
  goToLastPage: (totalPages: number) => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: (totalPages: number) => boolean;
  limit: number;
  setLimit: (limit: number) => void;
  search: string;
  handleChange: (search: string) => void;
  handleClear: () => void;
  onSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

const PartnersTable = (props: PartnersTableProps) => {
  if (!props.isLoading && props.partners.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 rounded-full bg-purple-100 p-4 text-[#5c24cc] dark:bg-purple-900/30 dark:text-purple-300">
          <Handshake className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          No partners found
        </h2>
        <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
          There are currently no partners to display. Use the Create Partner
          button to add the first one.
        </p>
      </div>
    );
  }

  return (
    <TableWrapper
      columns={PartnerColumns as unknown as ColumnDef<unknown>[]}
      data={props.partners}
      totalPages={props.totalPages}
      currentPage={props.currentPage}
      prevPage={props.prevPage}
      nextPage={props.nextPage}
      goToFirstPage={props.goToFirstPage}
      goToLastPage={props.goToLastPage}
      isFirstPage={props.isFirstPage}
      isLastPage={props.isLastPage}
      limit={props.limit}
      setLimit={props.setLimit}
      search={props.search}
      handleChange={props.handleChange}
      handleClear={props.handleClear}
      onSubmit={props.onSubmit}
      isLoading={props.isLoading}
    />
  );
};

export default PartnersTable;
