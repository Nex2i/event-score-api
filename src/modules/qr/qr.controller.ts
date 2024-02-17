import { FRONTEND_ORIGIN } from "@/config";
import { dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";

export async function RecordEventQr(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;

  reply.redirect(301, `${FRONTEND_ORIGIN}/public/event/${id}`);
}
