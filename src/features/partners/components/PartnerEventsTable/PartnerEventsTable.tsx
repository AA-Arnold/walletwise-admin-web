import Link from "next/link";
import { CalendarX, ExternalLink } from "lucide-react";

import StatusBubble from "@/components/atoms/StatusBubble/StatusBubble";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PartnerEvent } from "../../types";

const PartnerEventsTable = ({ events }: { events: PartnerEvent[] }) => {
  if (events.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 text-center dark:border-gray-700">
        <div className="mb-4 rounded-full bg-purple-100 p-4 text-[#5c24cc] dark:bg-purple-900/30 dark:text-purple-300">
          <CalendarX className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          No events created
        </h3>
        <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
          This partner has not created any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border dark:border-gray-800">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => {
            const eventId = event.event_id || String(event.id || "");

            return (
              <TableRow key={eventId || `${event.title}-${index}`}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  {event.date
                    ? new Date(event.date).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>{event.time || "—"}</TableCell>
                <TableCell className="max-w-64 truncate">
                  {event.address || "—"}
                </TableCell>
                <TableCell>
                  {event.status ? (
                    <StatusBubble status={event.status} />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {eventId ? (
                    <Link
                      href={`/services/events/info/${eventId}`}
                      className="inline-flex items-center gap-2 font-medium text-[#5c24cc] hover:underline dark:text-purple-400"
                    >
                      View event
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnerEventsTable;
