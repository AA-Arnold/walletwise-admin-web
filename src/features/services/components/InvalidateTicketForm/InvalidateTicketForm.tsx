"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useValidatePartnerTicket } from "../../hooks/useValidatePartnerTicket";

const InvalidateTicketForm = ({ eventId }: { eventId: string }) => {
  const [ticketId, setTicketId] = useState("");
  const invalidation = useValidatePartnerTicket(eventId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTicketId = ticketId.trim();
    if (!normalizedTicketId) return;

    invalidation.mutate(
      { ticketId: normalizedTicketId },
      { onSuccess: () => setTicketId("") },
    );
  };

  return (
    <section className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Invalidate a Ticket
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Enter the ticket ID exactly as it appears on the attendee&apos;s ticket.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ticket-id">Ticket ID</Label>
          <Input
            id="ticket-id"
            value={ticketId}
            onChange={(event) => setTicketId(event.target.value)}
            placeholder="WALL-3900953"
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          width="w-auto"
          disabled={!ticketId.trim()}
          loading={invalidation.isPending}
        >
          Invalidate Ticket
        </Button>
      </form>
    </section>
  );
};

export default InvalidateTicketForm;
