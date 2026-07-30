import { FormEvent, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTableState } from "@/lib/hooks/useTableState";
import { getPartners } from "../api";
import { Partner } from "../types";

const getPartnerList = (response: unknown): Partner[] => {
  if (Array.isArray(response)) return response as Partner[];
  if (!response || typeof response !== "object") return [];

  const body = response as {
    data?: unknown;
    partners?: unknown;
  };

  if (Array.isArray(body.partners)) return body.partners as Partner[];
  if (Array.isArray(body.data)) return body.data as Partner[];

  if (body.data && typeof body.data === "object") {
    const nestedData = body.data as { partners?: unknown };
    if (Array.isArray(nestedData.partners)) {
      return nestedData.partners as Partner[];
    }
  }

  return [];
};

export const useGetPartners = () => {
  const tableState = useTableState();
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const allPartners = useMemo(() => getPartnerList(response), [response]);

  const filteredPartners = useMemo(() => {
    const query = (tableState.submittedQuery || "").trim().toLowerCase();
    if (!query) return allPartners;

    return allPartners.filter((partner) =>
      [partner.company_name, partner.email, partner.phone_number].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    );
  }, [allPartners, tableState.submittedQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPartners.length / tableState.limit),
  );
  const startIndex = (tableState.currentPage - 1) * tableState.limit;
  const partners = filteredPartners.slice(
    startIndex,
    startIndex + tableState.limit,
  );

  return {
    ...tableState,
    partners,
    totalPages,
    isLoading,
    isError,
    refetch,
    handleSearch: (event?: FormEvent) => {
      event?.preventDefault();
      tableState.handleSearch();
    },
  };
};
