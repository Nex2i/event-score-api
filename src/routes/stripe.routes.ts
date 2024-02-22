import {
  CreateBillingPortal,
  NewCustomerCheckout,
} from "@/modules/billing/stripe.controller";
import { FastifyInstance } from "fastify";

const stripeSchema = {
  tags: ["stripe"],
};

export default async function StripeRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/stripe/portal/:companyId",
    handler: CreateBillingPortal,
    schema: stripeSchema,
  });

  fastify.route({
    method: "GET",
    url: "/stripe/init_checkout/:customerId",
    handler: NewCustomerCheckout,
    schema: stripeSchema,
  });
}
