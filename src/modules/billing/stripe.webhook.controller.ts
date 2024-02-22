import { STRIPE_SUBSCRIPTION_WEBHOOK_SECRET } from "@/config";
import { companyPaymentRepository } from "@/db/repositories/companyPayment.repository";
import { BadRequest } from "@/exceptions/error";
import { stripe } from "@/libs/stripe/stripe";
import { FastifyReply, FastifyRequest } from "fastify";

if (!STRIPE_SUBSCRIPTION_WEBHOOK_SECRET) {
  throw new Error("Missing Stripe subscription webhook secret");
}
const subscriptionWebhookSecret = STRIPE_SUBSCRIPTION_WEBHOOK_SECRET as string;
export async function SubscriptionCreatedWebhook(
  req: FastifyRequest<{
    Headers: { "stripe-signature": string };
    Body: string | Buffer;
  }>,
  reply: FastifyReply
) {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      req.body,
      signature,
      subscriptionWebhookSecret
    );
  } catch (err) {
    reply.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  switch (event.type) {
    case "customer.subscription.created": {
      const { customer } = event.data.object;
      if (!customer) throw new BadRequest("Customer not found");
      if (typeof customer !== "string")
        throw new BadRequest("Customer is not a string");

      await companyPaymentRepository.setAccountActiveFromExternalId(customer);
      break;
    }
    default: {
      console.warn(`Unhandled event type ${event.type}`);
    }
  }

  return reply.status(200).send("OK");
}
