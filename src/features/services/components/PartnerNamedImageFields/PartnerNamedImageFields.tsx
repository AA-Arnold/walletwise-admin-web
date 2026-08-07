"use client";

import { Trash2 } from "lucide-react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Textarea from "@/components/atoms/TextArea/Textarea";
import EventFileField from "../EventFileField/EventFileField";
import { NamedImage } from "../../hooks/useCreatePartnerEvent";

interface Props {
  kind: "headliner" | "prize";
  items: NamedImage[];
  onAdd: (kind: "headliner" | "prize") => void;
  onChange: (kind: "headliner" | "prize", index: number, field: keyof NamedImage, value: string | File | null) => void;
  onRemove: (kind: "headliner" | "prize", index: number) => void;
}

const PartnerNamedImageFields = ({ kind, items, onAdd, onChange, onRemove }: Props) => {
  const isHeadliner = kind === "headliner";
  const title = isHeadliner ? "Headliners" : "Prizes";
  return (
    <section className="space-y-4">
      <div className="space-y-1"><h2 className="font-medium">{title}</h2><p className="text-sm text-gray-500">Optional. Add each {isHeadliner ? "artist" : "prize"} and their matching image.</p></div>
      {items.map((item, index) => (
        <div key={index} className="space-y-4 rounded-xl border border-[#F0F0F0] p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2"><Label title={isHeadliner ? "Artist name" : "Prize name"} /><Input type="text" name={`${kind}-${index}`} value={item.name} placeholder={isHeadliner ? "e.g. Burna Boy" : "e.g. Crown"} onChange={(event) => onChange(kind, index, "name", event.target.value)} /></div>
            <button type="button" onClick={() => onRemove(kind, index)} aria-label={`Remove ${kind} ${index + 1}`} className="mb-1 flex size-9 items-center justify-center text-gray-500 hover:text-red-600"><Trash2 className="size-4" /></button>
          </div>
          {!isHeadliner && <div className="space-y-2"><Label title="Description" /><Textarea rows={3} name={`prize-description-${index}`} value={item.description} placeholder="Describe the prize" onChange={(event) => onChange(kind, index, "description", event.target.value)} /></div>}
          <EventFileField id={`${kind}-image-${index}`} label={`${isHeadliner ? "Headliner" : "Prize"} image`} required file={item.image} preview={item.preview} onChange={(file) => onChange(kind, index, "image", file)} onClear={() => onChange(kind, index, "image", null)} />
        </div>
      ))}
      <button type="button" onClick={() => onAdd(kind)} className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]">+ Add {kind}</button>
    </section>
  );
};

export default PartnerNamedImageFields;
