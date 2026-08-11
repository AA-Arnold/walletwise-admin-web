import { getEventInfo } from "../api/events";
import { useQuery } from "@tanstack/react-query";

export const useGetEventInfo = (eventId: string, enabled = true) => {
  const { data, isLoading } = useQuery({
    queryKey: ["event info", eventId],
    queryFn: () => getEventInfo({ eventId }),
    enabled: enabled && Boolean(eventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isLoading,
  };
};
