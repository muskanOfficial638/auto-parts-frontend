/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PartRequest {
  id: string;
  title: string;
  urgency: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_model_trim: string;
  required_by_date: string;
  attachment: string;
  status: number;
  description: string;
}

export interface Quote {
  id: string;
  request_id: string;
  user_id: string;
  price_cents: string;
  currency: string;
  eta_days: string;
  terms: string;
  status: string;
  created_at: string;
  user?: object | any;
  part_request?: PartRequest
}