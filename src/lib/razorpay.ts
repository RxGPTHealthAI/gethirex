import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay?: any;
    initiateRazorpayPayment?: (planId: string) => void;
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// ---------- Plan / Pack catalog (amounts in INR rupees) ----------
// Source of truth lives in PricingPage; this mirror is used for checkout amounts.
const PLAN_CATALOG: Record<string, { name: string; monthly: number; annual: number }> = {
  starter: { name: "Starter", monthly: 999, annual: 749 },
  pro: { name: "Pro", monthly: 2499, annual: 1874 },
  ultimate: { name: "Ultimate", monthly: 4999, annual: 3749 },
};

const REFUEL_CATALOG: Record<string, { name: string; price: number }> = {
  mini: { name: "Mini Refuel", price: 299 },
  power: { name: "Power Refuel", price: 799 },
  mega: { name: "Mega Refuel", price: 2299 },
};

const EMPLOYER_CATALOG: Record<string, { name: string; monthly: number; annual: number }> = {
  starter: { name: "Employer Starter", monthly: 4999, annual: 3749 },
  growth: { name: "Employer Growth", monthly: 12999, annual: 9749 },
  scale: { name: "Employer Scale", monthly: 29999, annual: 22499 },
};

export interface CheckoutOptions {
  planId: string;
  billing?: "monthly" | "annual"; // for subscriptions; ignored for refuel
  customer?: { name?: string; email?: string; contact?: string };
}

function resolveAmountAndName(planId: string, billing: "monthly" | "annual"): { amountRupees: number; name: string } | null {
  // refuel-{id}
  if (planId.startsWith("refuel-")) {
    const id = planId.slice("refuel-".length);
    const p = REFUEL_CATALOG[id];
    if (!p) return null;
    return { amountRupees: p.price, name: p.name };
  }
  // employer-{name}
  if (planId.startsWith("employer-")) {
    const id = planId.slice("employer-".length);
    const p = EMPLOYER_CATALOG[id];
    if (!p) return null;
    return { amountRupees: billing === "annual" ? p.annual : p.monthly, name: p.name };
  }
  // candidate tier
  const tier = PLAN_CATALOG[planId];
  if (!tier) return null;
  return { amountRupees: billing === "annual" ? tier.annual : tier.monthly, name: tier.name };
}

export async function startRazorpayCheckout(opts: CheckoutOptions): Promise<void> {
  const billing = opts.billing ?? "monthly";
  const resolved = resolveAmountAndName(opts.planId, billing);
  if (!resolved) {
    toast({ title: "Plan not found", description: `Unknown plan: ${opts.planId}`, variant: "destructive" });
    return;
  }

  const ok = await loadRazorpayScript();
  if (!ok || !window.Razorpay) {
    toast({ title: "Checkout unavailable", description: "Could not load Razorpay. Check your connection.", variant: "destructive" });
    return;
  }

  // For annual billing on subscription plans, charge the full year upfront (12x the displayed monthly price).
  // Refuel packs are one-time purchases, so never multiply.
  const isRefuel = opts.planId.startsWith("refuel-");
  const chargeRupees = billing === "annual" && !isRefuel
    ? resolved.amountRupees * 12
    : resolved.amountRupees;

  // 1) Create order on backend
  const amountPaise = Math.round(chargeRupees * 100);
  const { data: orderData, error: orderErr } = await supabase.functions.invoke("razorpay-create-order", {
    body: {
      amount: amountPaise,
      currency: "INR",
      receipt: `${opts.planId}_${Date.now()}`.slice(0, 40),
      notes: { plan_id: opts.planId, billing },
    },
  });

  if (orderErr || !orderData?.order_id) {
    console.error("create-order failed", orderErr, orderData);
    toast({ title: "Could not start payment", description: orderErr?.message ?? "Please try again.", variant: "destructive" });
    return;
  }

  // 2) Open Razorpay modal
  const rzp = new window.Razorpay({
    key: orderData.key_id,
    amount: orderData.amount,
    currency: orderData.currency,
    order_id: orderData.order_id,
    name: "HireX",
    description: `${resolved.name} — ${billing === "annual" ? "Annual" : "Monthly"}`,
    prefill: {
      name: opts.customer?.name ?? "",
      email: opts.customer?.email ?? "",
      contact: opts.customer?.contact ?? "",
    },
    theme: { color: "#5b6ef5" },
    modal: {
      ondismiss: () => {
        toast({ title: "Payment cancelled", description: "You closed the checkout window." });
      },
    },
    handler: async (response: any) => {
      // 3) Verify on backend
      const { data: verifyData, error: verifyErr } = await supabase.functions.invoke(
        "razorpay-verify-payment",
        { body: response },
      );
      if (verifyErr || !verifyData?.verified) {
        console.error("verify failed", verifyErr, verifyData);
        toast({
          title: "Payment verification failed",
          description: "If money was debited, contact care@gethirex.space.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Payment successful 🎉",
        description: `${resolved.name} activated. Payment ID: ${response.razorpay_payment_id}`,
      });
    },
  });

  rzp.on("payment.failed", (resp: any) => {
    console.error("payment.failed", resp?.error);
    toast({
      title: "Payment failed",
      description: resp?.error?.description ?? "Please try again or use another method.",
      variant: "destructive",
    });
  });

  rzp.open();
}

// Global helper used by existing CTAs
export function initiateRazorpayPayment(planId: string, billing: "monthly" | "annual" = "monthly") {
  void startRazorpayCheckout({ planId, billing });
}

if (typeof window !== "undefined") {
  window.initiateRazorpayPayment = (planId: string) => initiateRazorpayPayment(planId);
}
