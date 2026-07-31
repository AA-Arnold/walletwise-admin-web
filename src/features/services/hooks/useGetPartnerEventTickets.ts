import { useQuery } from "@tanstack/react-query";

import { getPartnerEventTickets } from "../api/events";

export const useGetPartnerEventTickets = (
  eventId: string,
  page: number,
  limit: number,
  search?: string,
  attendanceStatus?: string,
  paymentStatus?: string,
) =>
  useQuery({
    queryKey: [
      "partner event tickets",
      eventId,
      page,
      limit,
      search,
      attendanceStatus,
      paymentStatus,
    ],
    queryFn: () =>
      getPartnerEventTickets({
        eventId,
        page,
        limit,
        search,
        attendance_status: attendanceStatus,
        payment_status: paymentStatus,
      }),
    enabled: Boolean(eventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
