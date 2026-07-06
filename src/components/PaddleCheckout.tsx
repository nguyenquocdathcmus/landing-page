"use client";

import { useEffect, useRef } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { useRouter } from "@/i18n/navigation";

// Paddle's "Default payment link" points at this site, so the checkout URL
// the desktop app opens looks like https://<site>/?_ptxn=txn_xxx. Paddle.js,
// once initialized, detects the _ptxn param on its own and opens the overlay
// checkout — no explicit Checkout.open() call needed for that path.
export function PaddleCheckout() {
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token || initialized.current) return;
    initialized.current = true;

    initializePaddle({
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
          ? "production"
          : "sandbox",
      token,
      eventCallback(event) {
        // Give Paddle's own "payment received" screen a moment before we
        // take over with the localized success page.
        if (event.name === "checkout.completed") {
          setTimeout(() => router.push("/checkout/success"), 1500);
        }
      },
    });
  }, [router]);

  return null;
}
