import Link from "next/link";
import { CalendarX } from "lucide-react";

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
import EventActionCell from "@/features/services/components/EventActionCell/EventActionCell";

const PartnerEventsTable = ({ events }: { events: PartnerEvent[] }) => {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

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
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/services/events/info/${event.id}`}
                  className="text-[#5c24cc] hover:underline dark:text-purple-400"
                >
                  {event.name}
                </Link>
              </TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{formatDate(event.date)}</TableCell>
              <TableCell>
                <StatusBubble status={event.status} />
              </TableCell>
              <TableCell>{formatDate(event.created_at)}</TableCell>
              <TableCell className="text-right">
                <EventActionCell eventId={event.id} status={event.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnerEventsTable;
