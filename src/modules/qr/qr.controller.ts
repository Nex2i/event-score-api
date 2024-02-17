import { FRONTEND_ORIGIN } from "@/config";
import { dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";

export async function RecordEventQr(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;

  await dbClient.eventQRScan.create({
    data: {
      eventId: id,
      ipAddress: req.ip,
    },
  });

  reply.redirect(302, `${FRONTEND_ORIGIN}/public/event/${id}`);
}
