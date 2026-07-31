import { useQuery } from "@tanstack/react-query";

import { getPartnerEventTickets } from "../api/events";

export const useGetPartnerEventTickets = (
  eventId: string,
  page: number,
  limit: number,
) =>
  useQuery({
    queryKey: ["partner event tickets", eventId, page, limit],
    queryFn: () => getPartnerEventTickets({ eventId, page, limit }),
    enabled: Boolean(eventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
