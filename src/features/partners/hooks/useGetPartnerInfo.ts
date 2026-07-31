import { useQuery } from "@tanstack/react-query";

import { getPartnerInfo } from "../api";
import { PartnerInfo } from "../types";

const normalizePartnerInfo = (response: unknown): PartnerInfo | undefined => {
  if (!response || typeof response !== "object") return undefined;

  const responseBody = response as Record<string, unknown>;
  if (!responseBody.data || typeof responseBody.data !== "object") {
    return undefined;
  }

  const data = responseBody.data as Record<string, unknown>;
  if (!data.partner || typeof data.partner !== "object") return undefined;

  const partner = data.partner as PartnerInfo;
  if (!partner.id) return undefined;

  return {
    ...partner,
    events: Array.isArray(data.events)
      ? (data.events as PartnerInfo["events"])
      : [],
    pagination: data.pagination as PartnerInfo["pagination"],
  };
};

export const useGetPartnerInfo = (partnerId: string) => {
  const query = useQuery({
    queryKey: ["partner info", partnerId],
    queryFn: () => getPartnerInfo({ partnerId }),
    select: normalizePartnerInfo,
    enabled: Boolean(partnerId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return query;
};
