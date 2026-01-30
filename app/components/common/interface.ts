/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PartRequest {
  id?: string;
  title: string;
  urgency: string;
  user_id?: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_model_trim: string;
  required_by_date: string;
  attachment: string[]; 
  status: number;
  description: string;
}

export interface OrdersType {
  id: string;
  orderID: string;
  status: string;
  created_at: string;
  productTitle: string;
  productImage: string;
  quotedPrice: number;

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
   attachment: ( string)[]; 
}

export interface QuoteCreate {
  price_cents: string;
  currency: string;
  eta_days: string;
  terms: string;
   attachment: (File | string)[]; 
}

export interface Trim {
    id: string;
    trim: string;
    year_from: number;
    year_to: number;
}

export interface Model {
    id: string;
    name: string;
    trims: Trim[];
}

export interface Make {
    make_id: string;
    make_name: string;
    models: Model[];
}