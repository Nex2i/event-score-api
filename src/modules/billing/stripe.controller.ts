import { dbClient } from "@/db/db.client";
import { stripeRepository } from "@/libs/stripe/stripe.repository";
import { FastifyReply, FastifyRequest } from "fastify";

export async function CreateBillingPortal(
  req: FastifyRequest<{ Params: { companyId: string } }>,
  reply: FastifyReply
) {
  const { companyId } = req.params;
  const companyBilling = await dbClient.companyPayment.findFirst({
    where: { companyId },
  });
  if (!companyBilling) {
    reply.status(400).send({ error: "Company not found" });
    return;
  }
  const billingUrl = await stripeRepository.getBillingPortalUrl(
    companyBilling.externalPaymentId
  );
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
