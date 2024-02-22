import { SubscriptionCreatedWebhook } from "@/modules/billing/stripe.webhook.controller";
import { FastifyInstance } from "fastify";

const baseUrl = "/stripe/webhook";
export default async function StripeRoutes(fastify: FastifyInstance) {
  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    function (req, body, done) {
      done(null, body);
    }
  );

  fastify.route({
    method: "POST",
    url: `${baseUrl}/subscription-created`,
    handler: SubscriptionCreatedWebhook,
    schema: {
      headers: {
        type: "object",
        properties: {
          "stripe-signature": { type: "string" },
        },
      },
      body: {
        type: "object",
      },
    },
  });
}
