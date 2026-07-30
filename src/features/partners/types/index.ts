export interface Partner {
  id: string;
  company_name: string;
  email: string;
  phone_number: string;
  status: string;
  created_at?: string;
}

export interface PartnerEvent {
  id?: string | number;
  event_id?: string;
  title: string;
  date?: string;
  time?: string;
  address?: string;
  status?: string;
  created_at?: string;
}

export interface PartnerInfo extends Partner {
  events: PartnerEvent[];
}

export interface CreatePartnerPayload {
  company_name: string;
  email: string;
  phone_number: string;
  password: string;
}
