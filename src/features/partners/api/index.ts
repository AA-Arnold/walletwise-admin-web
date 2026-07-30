import { axiosInstance } from "@/lib/axiosInstance";

import { CreatePartnerPayload } from "../types";

export const getPartners = async () => {
  const response = await axiosInstance.get("/partner");

  // Temporary inspection log requested while the response contract is confirmed.
  console.log("GET /partner response:", response.data);

  return response.data;
};

export const createPartner = async (payload: CreatePartnerPayload) => {
  const { data } = await axiosInstance.post("/partner/create", payload);
  return data;
};

export const deletePartner = async ({ partnerId }: { partnerId: string }) => {
  const { data } = await axiosInstance.delete(`/partner/${partnerId}`);
  return data;
};

export const getPartnerInfo = async ({
  partnerId,
}: {
  partnerId: string;
}) => {
  const { data } = await axiosInstance.get(`/partner/${partnerId}`);
  return data;
};

export const activatePartner = async ({
  partnerId,
}: {
  partnerId: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/partner/${partnerId}/activate`,
  );
  return data;
};

export const deactivatePartner = async ({
  partnerId,
}: {
  partnerId: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/partner/${partnerId}/deactivate`,
  );
  return data;
};
