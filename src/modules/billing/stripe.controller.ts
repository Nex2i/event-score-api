import { stripeRepository } from "@/libs/stripe/stripe.repository";
import { FastifyReply, FastifyRequest } from "fastify";

export async function CreateBillingPortal(
  req: FastifyRequest<{ Params: { customerId: string } }>,
  reply: FastifyReply
) {
  const { customerId } = req.params;
  const billingUrl = await stripeRepository.getBillingPortalUrl(customerId);
  reply.status(200).send({ billingUrl });
}

export async function NewCustomerCheckout(
  req: FastifyRequest<{ Params: { customerId: string } }>,
  reply: FastifyReply
) {
  const { customerId } = req.params;
  const checkoutUrl = await stripeRepository.getInitCheckoutUrl(customerId);
  reply.status(200).send({ checkoutUrl });
}
