import Strip from "stripe";
import { STRIPE_API_KEY } from "@/config";
import { CreateStripeCustomer } from "./stripe.types";

if (!STRIPE_API_KEY) {
  throw new Error("Missing Stripe API Key");
}

const stripe = new Strip(STRIPE_API_KEY);

class StripeRepository {
  public async createCustomer(payload: CreateStripeCustomer) {
    return await stripe.customers.create({
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      address: {
        line1: payload.address.street1,
        line2: payload.address.street2,
        city: payload.address.city,
        state: payload.address.state,
        postal_code: payload.address.postalCode,
      },
      metadata: {
        companyId: payload.companyId,
      },
    });
  }
}

export const stripeRepository = new StripeRepository();
