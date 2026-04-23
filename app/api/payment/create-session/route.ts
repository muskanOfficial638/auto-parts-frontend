import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import {  orderAPI } from "@/app/utils/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("ATXAT")?.value;
    const body = await req.json();
    const res = await fetch(`${orderAPI}/order-details/${body.orderId}` ,{
        method: "GET",    
        headers:{ 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

         }
      });
      const data = await res.json();
if(data.success){

const session = await stripe.checkout.sessions.create({
  mode: "payment",

  payment_method_types: [
    "card"
  ],
  customer_email: data.buyerEmail,
  metadata: {
    orderId: body.orderId,
    userName: data.buyerName,
    productName: data.productName,
  },
  customer_creation: "always",
  

  line_items: [
    {
      price_data: {
        currency: "zar",
        product_data: {
          name: data.productName,
         
        },
        unit_amount: data.amount * 100,
      },
      quantity: 1,
    },
  ],

  success_url:
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success/{CHECKOUT_SESSION_ID}`,

  cancel_url:
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel/{CHECKOUT_SESSION_ID}`,
});


    return NextResponse.json({
      url: session.url,
      success: true,
    });
} else {
  return NextResponse.json(
    { error: "Failed to create checkout session", success: false },
    { status: 400 }
  );
}
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}