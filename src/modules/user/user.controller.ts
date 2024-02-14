import { dbClient, USER_TYPE } from "@/db/db.client";
import { NotFound } from "@/exceptions/error";
import { FastifyRequest, FastifyReply } from "fastify";

export async function CreateGuestUser(
  req: FastifyRequest<{ Params: { eventId: string } }>,
  reply: FastifyReply
) {
  const event = await dbClient.event.findUnique({
    where: { id: req.params.eventId },
  });

  if (!event) {
    throw new NotFound(`Event: ${req.params.eventId} not found`);
  }

  const guestUser = await dbClient.user.create({
    data: {
      type: USER_TYPE.GUEST,
      companyId: event.companyId,
    },
  });

  const accessToken = await reply.jwtSign({ payload: guestUser });
  reply
    .status(201)
    .send({ message: "Guest user created", guestUser, accessToken });
}
