import { SubmitEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createPartnerEvent } from "../api/events";
import {
  PartnerEventCategory,
  PartnerEventCustomField,
  PartnerEventPayload,
  PartnerEventTicketType,
} from "../types/partnerEvent";

export interface NamedImage {
  name: string;
  description?: string;
  image: File | null;
  preview: string | null;
}

const initialPayload: PartnerEventPayload = {
  partner_id: "",
  title: "",
  description: "",
  category: "Concert",
  date: "",
  time: "",
  end_time: "",
  address: "",
  service_fee: 0,
  refund_policy: "",
  ticket_types: [{ type: "Regular", price: 0, capacity: 0 }],
};

export const useCreatePartnerEvent = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialPayload);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [headliners, setHeadliners] = useState<NamedImage[]>([]);
  const [prizes, setPrizes] = useState<NamedImage[]>([]);
  const [customFields, setCustomFields] = useState<PartnerEventCustomField[]>(
    [],
  );

  useEffect(() => {
    const partnerId = searchParams.get("partnerId");
    if (partnerId)
      setForm((current) => ({ ...current, partner_id: partnerId }));
  }, [searchParams]);

  const setField = useCallback(
    <K extends keyof PartnerEventPayload>(
      field: K,
      value: PartnerEventPayload[K],
    ) => setForm((current) => ({ ...current, [field]: value })),
    [],
  );

  const setCategory = useCallback((category: PartnerEventCategory) => {
    setForm((current) => ({ ...current, category }));
    if (category !== "Beauty Pageant") {
      setPrizes([]);
      setCustomFields([]);
    }
  }, []);

  const changeTicket = useCallback(
    (
      index: number,
      field: keyof PartnerEventTicketType,
      value: string | number,
    ) =>
      setForm((current) => ({
        ...current,
        ticket_types: current.ticket_types.map((ticket, ticketIndex) =>
          ticketIndex === index ? { ...ticket, [field]: value } : ticket,
        ),
      })),
    [],
  );
  const addTicket = useCallback(
    () =>
      setForm((current) => ({
        ...current,
        ticket_types: [
          ...current.ticket_types,
          { type: "", price: 0, capacity: 0 },
        ],
      })),
    [],
  );
  const removeTicket = useCallback(
    (index: number) =>
      setForm((current) => ({
        ...current,
        ticket_types: current.ticket_types.filter((_, i) => i !== index),
      })),
    [],
  );

  const updateNamedImage = useCallback(
    (
      kind: "headliner" | "prize",
      index: number,
      field: keyof NamedImage,
      value: string | File | null,
    ) => {
      const setter = kind === "headliner" ? setHeadliners : setPrizes;
      setter((current) =>
        current.map((item, i) => {
          if (i !== index) return item;
          if (field !== "image") return { ...item, [field]: value };
          if (item.preview) URL.revokeObjectURL(item.preview);
          const image = value as File | null;
          return {
            ...item,
            image,
            preview: image ? URL.createObjectURL(image) : null,
          };
        }),
      );
    },
    [],
  );
  const addNamedImage = useCallback((kind: "headliner" | "prize") => {
    const setter = kind === "headliner" ? setHeadliners : setPrizes;
    setter((current) => [
      ...current,
      { name: "", description: "", image: null, preview: null },
    ]);
  }, []);

  const changeMainImage = useCallback(
    (kind: "thumbnail" | "banner", file: File | null) => {
      const setFile = kind === "thumbnail" ? setThumbnail : setBanner;
      const setPreview =
        kind === "thumbnail" ? setThumbnailPreview : setBannerPreview;
      setPreview((current) => {
        if (current) URL.revokeObjectURL(current);
        return file ? URL.createObjectURL(file) : null;
      });
      setFile(file);
    },
    [],
  );
  const removeNamedImage = useCallback(
    (kind: "headliner" | "prize", index: number) => {
      const setter = kind === "headliner" ? setHeadliners : setPrizes;
      setter((current) => current.filter((_, i) => i !== index));
    },
    [],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: createPartnerEvent,
    onSuccess: () => {
      toast.success("Partner event successfully created");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      setForm(initialPayload);
      setThumbnail(null);
      setThumbnailPreview(null);
      setBanner(null);
      setBannerPreview(null);
      setHeadliners([]);
      setPrizes([]);
      setCustomFields([]);
    },
    onError: (error: ApiErrorResponse) => promiseErrorFunction(error),
  });

  const handleSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      const requiredValues = [
        form.partner_id,
        form.title,
        form.description,
        form.date,
        form.time,
        form.end_time,
        form.address,
      ];
      if (requiredValues.some((value) => !value.trim())) {
        toast.error("Please complete all required event fields.");
        return;
      }
      if (!thumbnail) {
        toast.error("Thumbnail image is required.");
        return;
      }
      if (
        !form.ticket_types.length ||
        form.ticket_types.some(
          (ticket) => !ticket.type.trim() || ticket.capacity <= 0,
        )
      ) {
        toast.error("Add at least one valid ticket tier.");
        return;
      }

      const isPageant = form.category === "Beauty Pageant";
      mutate({
        payload: {
          ...form,
          ...(headliners.length && {
            headliner: headliners.map((item) => ({ artist_name: item.name })),
          }),
          ...(isPageant &&
            prizes.length && {
              prizes: prizes.map((item) => ({
                name: item.name,
                description: item.description || "",
              })),
            }),
          ...(isPageant && {
            form_settings: {
              full_name: { input_type: "text", is_required: true },
              date_of_birth: { input_type: "date", is_required: true },
              state_of_origin: { input_type: "text", is_required: true },
              custom_fields: customFields,
            },
          }),
        },
        files: {
          thumbnail,
          banner,
          headlinerImages: headliners.flatMap((item) =>
            item.image ? [item.image] : [],
          ),
          prizeImages: prizes.flatMap((item) =>
            item.image ? [item.image] : [],
          ),
        },
      });
    },
    [banner, customFields, form, headliners, mutate, prizes, thumbnail],
  );

  return {
    form,
    setField,
    setCategory,
    thumbnail,
    thumbnailPreview,
    banner,
    bannerPreview,
    changeMainImage,
    headliners,
    prizes,
    customFields,
    setCustomFields,
    updateNamedImage,
    addNamedImage,
    removeNamedImage,
    changeTicket,
    addTicket,
    removeTicket,
    handleSubmit,
    isPending,
  };
};
