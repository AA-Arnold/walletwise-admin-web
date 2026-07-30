import { useQuery } from "@tanstack/react-query";

import { getPartnerInfo } from "../api";
import { Partner, PartnerEvent, PartnerInfo } from "../types";

const normalizePartnerInfo = (response: unknown): PartnerInfo | undefined => {
  if (!response || typeof response !== "object") return undefined;

  const responseBody = response as Record<string, unknown>;
  const data =
    responseBody.data && typeof responseBody.data === "object"
      ? (responseBody.data as Record<string, unknown>)
      : responseBody;
  const partner =
    data.partner && typeof data.partner === "object"
      ? (data.partner as Partner)
      : (data as unknown as Partner);
  const events = Array.isArray(data.events)
    ? (data.events as PartnerEvent[])
    : Array.isArray((partner as Partner & { events?: unknown }).events)
      ? ((partner as Partner & { events: PartnerEvent[] }).events ?? [])
      : [];

  if (!partner?.id) return undefined;

  return { ...partner, events };
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
