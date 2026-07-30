"use client";

import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import CreatePartnerAction from "../CreatePartnerAction/CreatePartnerAction";
import PartnersTable from "../PartnersTable/PartnersTable";
import { useGetPartners } from "../../hooks/useGetPartners";

const ManagePartnersWrapper = () => {
  const partners = useGetPartners();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4 md:items-center">
        <PageTitle
          title="Partner Management"
          description="Create partners and manage partner event access"
        />
        <CreatePartnerAction />
      </div>

      {partners.isError && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          Partners could not be loaded. Please try again.
        </p>
      )}

      <PartnersTable
        partners={partners.partners}
        totalPages={partners.totalPages}
        currentPage={partners.currentPage}
        prevPage={partners.prevPage}
        nextPage={partners.nextPage}
        goToFirstPage={partners.goToFirstPage}
        goToLastPage={partners.goToLastPage}
        isFirstPage={partners.isFirstPage}
        isLastPage={partners.isLastPage}
        limit={partners.limit}
        setLimit={partners.setLimit}
        search={partners.search}
        handleChange={partners.handleSearchChange}
        handleClear={partners.handleClear}
        onSubmit={partners.handleSearch}
        isLoading={partners.isLoading}
      />
    </div>
  );
};

export default ManagePartnersWrapper;
