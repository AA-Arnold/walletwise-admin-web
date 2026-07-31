export interface Partner {
  id: string;
  company_name: string;
  email: string;
  phone_number: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  created_by?: string;
}

export interface PartnerEvent {
  id: string;
  name: string;
  category: string;
  date: string;
  status: string;
  created_at: string;
}

export interface PartnerEventsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PartnerInfo extends Partner {
  events: PartnerEvent[];
  pagination: PartnerEventsPagination;
}

export interface CreatePartnerPayload {
  company_name: string;
  email: string;
  phone_number: string;
  password: string;
}
