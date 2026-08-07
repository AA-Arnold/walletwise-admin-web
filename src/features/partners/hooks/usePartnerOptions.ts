import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPartners } from "../api";
import { getPartnerList } from "./useGetPartners";

export const usePartnerOptions = () => {
  const query = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const options = useMemo(
    () =>
      getPartnerList(query.data).map((partner) => ({
        label: partner.company_name,
        value: partner.id,
      })),
    [query.data],
  );

  return { ...query, options };
};
