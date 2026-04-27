// Razorpay - Create Order
// Creates an order via Razorpay Orders API and returns order_id to the client.
import { corsHeaders } from "@supabase/supabase-js/cors";

interface CreateOrderBody {
  amount: number; // in paise
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!KEY_ID || !KEY_SECRET) {
      console.error("Missing Razorpay credentials");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: CreateOrderBody;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const amount = Number(body?.amount);
    const currency = (body?.currency || "INR").toUpperCase();
    const receipt = body?.receipt || `rcpt_${Date.now()}`;
    const notes = body?.notes ?? {};

    if (!Number.isFinite(amount) || amount < 100) {
      return new Response(
        JSON.stringify({ error: "amount must be an integer >= 100 (paise)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency,
        receipt,
        notes,
      }),
    });

    const data = await rzpRes.json();

    if (!rzpRes.ok) {
      console.error("Razorpay create order failed", rzpRes.status, data);
      const status = rzpRes.status === 401 ? 401 : 500;
      return new Response(
        JSON.stringify({ error: "Failed to create order", details: data }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,
        key_id: KEY_ID, // publishable, safe to return
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Unexpected error in razorpay-create-order", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
