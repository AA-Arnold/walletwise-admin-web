"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { PartnerEventPayload } from "../../types/partnerEvent";

interface Props {
  form: PartnerEventPayload;
  thumbnailPreview: string | null;
  bannerPreview: string | null;
}

const PartnerEventImageGuide = ({ form, thumbnailPreview, bannerPreview }: Props) => {
  const [previewMode, setPreviewMode] = useState<"thumbnail" | "banner">("thumbnail");
  const firstTicket = form.ticket_types.find((ticket) => ticket.type.trim());

  return (
    <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
      <section className="rounded-2xl bg-[#F5F5F5] p-4">
        <h2 className="mb-3 text-sm font-medium text-[#737373]">Image upload guide</h2>
        <div className="rounded-xl bg-white p-4 text-sm leading-5 text-[#404040]">
          <p className="mb-2">Upload two images to make your event stand out:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Thumbnail image (1:1), Required:</strong> Your primary event image. This square image appears in event listings, search results, and anywhere your event is previewed.</li>
            <li><strong>Event page image (16:9), Optional:</strong> A wide landscape banner displayed at the top of your event details page, giving attendees a richer first impression.</li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl bg-[#F5F5F5] p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-[#737373]">Live preview</h2>
          <div className="relative flex rounded-lg bg-[#E5E5E5] p-0.5 text-xs">
            {(["thumbnail", "banner"] as const).map((mode) => (
              <button key={mode} type="button" onClick={() => setPreviewMode(mode)} className={`relative z-10 cursor-pointer rounded-md px-3 py-1.5 transition-colors duration-300 ${previewMode === mode ? "text-[#262626]" : "text-[#737373]"}`}>
                {previewMode === mode && <motion.span layoutId="active-partner-preview-tab" className="absolute inset-0 -z-10 rounded-md bg-white shadow-sm" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                {mode === "thumbnail" ? "Thumbnail" : "Event page"}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={previewMode} initial={{ opacity: 0, y: 8, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.985 }} transition={{ duration: 0.22, ease: "easeOut" }}>
            {previewMode === "thumbnail" ? (
              <div className="overflow-hidden rounded-xl bg-white p-3">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#E5E5E5]">
                  {thumbnailPreview ? <Image src={thumbnailPreview} alt="Thumbnail preview" fill sizes="(max-width: 1280px) 100vw, 380px" unoptimized className="object-cover" /> : <PreviewPlaceholder label="1:1 thumbnail preview" />}
                  <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-xs text-white">{form.category || "Category"}</span>
                </div>
                <h3 className="mt-3 truncate font-semibold text-[#262626]">{form.title || "Your event title"}</h3>
                <p className="mt-1 truncate text-sm font-medium text-[#737373]">{form.date || "Event date"}, {form.address || "Event venue"}</p>
                <p className="mt-1 text-sm font-medium text-[#737373]">{firstTicket?.price ? `₦${firstTicket.price.toLocaleString()}` : "Ticket price"}</p>
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-xl bg-[#D4D4D4]">
                {bannerPreview || thumbnailPreview ? <Image src={bannerPreview || thumbnailPreview || ""} alt="Event page banner preview" fill sizes="(max-width: 1280px) 100vw, 380px" unoptimized className="object-cover" /> : <PreviewPlaceholder label="16:9 event page preview" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35" />
                <div className="absolute inset-x-0 bottom-0 space-y-1 p-4 text-white"><span className="inline-block rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-semibold">Upcoming Event</span><h3 className="line-clamp-2 text-xl font-extrabold uppercase leading-none">{form.title || "Your event title"}</h3><div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px]"><span className="flex items-center gap-1"><MapPin className="size-3" />{form.address || "Event venue"}</span><span className="flex items-center gap-1"><Clock3 className="size-3" />{form.date || "Event date"} · {form.time || "Start time"}</span></div></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </aside>
  );
};

const PreviewPlaceholder = ({ label }: { label: string }) => <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E5E5E5] to-[#D4D4D4] px-4 text-center text-sm font-medium text-[#737373]">Upload an image to see the {label}</div>;

export default PartnerEventImageGuide;
