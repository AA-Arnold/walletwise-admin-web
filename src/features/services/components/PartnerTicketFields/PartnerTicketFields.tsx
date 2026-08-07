"use client";

import { memo, useState } from "react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { PartnerEventTicketType } from "../../types/partnerEvent";

interface Props {
  tickets: PartnerEventTicketType[];
  onChange: (index: number, field: keyof PartnerEventTicketType, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const PartnerTicketFields = memo(function PartnerTicketFields({ tickets, onChange, onAdd, onRemove }: Props) {
  const [confirmed, setConfirmed] = useState<number[]>([]);

  return (
    <section className="space-y-4">
      <div className="space-y-1"><h2 className="font-medium">Tickets</h2><p className="text-sm text-gray-500">Add one or more ticket tiers for the event.</p></div>
      <div className="space-y-3">
        {tickets.map((ticket, index) => confirmed.includes(index) ? (
          <div key={index} className="mb-2 flex items-center justify-between rounded border bg-gray-50 px-3 py-2">
            <div className="flex items-center gap-4"><span className="text-sm font-medium capitalize">{ticket.type}</span><span className="text-sm text-gray-500">₦{ticket.price}</span><span className="text-sm text-gray-500">{ticket.capacity} slots</span></div>
            <div className="flex items-center gap-2"><button type="button" onClick={() => setConfirmed((current) => current.filter((item) => item !== index))} className="text-xs text-blue-500">Edit</button>{index !== 0 && <button type="button" onClick={() => onRemove(index)} aria-label="Remove ticket">×</button>}</div>
          </div>
        ) : (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div className="w-full space-y-2"><Label title="Name" /><Input type="text" name="name" placeholder="Ticket name (e.g. Early Bird)" value={ticket.type} onChange={(e) => onChange(index, "type", e.target.value)} /></div>
            <div className="flex items-center gap-2">
              <div className="w-full flex-1 space-y-2"><Label title="Price (₦)" /><Input type="number" name="price" placeholder="0" value={ticket.price || ""} onChange={(e) => onChange(index, "price", Number(e.target.value))} /></div>
              <div className="w-full flex-1 space-y-2"><Label title="Capacity" /><Input type="text" name="capacity" placeholder="0" value={ticket.capacity || ""} onChange={(e) => onChange(index, "capacity", Number(e.target.value))} /></div>
              <button type="button" onClick={() => ticket.type.trim() && ticket.capacity > 0 && setConfirmed((current) => [...current, index])} className="mt-6 flex h-6 items-center justify-center rounded bg-[#6637CF] px-3 text-sm text-white">Add</button>
              {index !== 0 && <button type="button" onClick={() => onRemove(index)} className="mt-6">×</button>}
            </div>
          </div>
        ))}
        <button type="button" onClick={onAdd} className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]">+ Add ticket tier</button>
      </div>
    </section>
  );
});

export default PartnerTicketFields;
