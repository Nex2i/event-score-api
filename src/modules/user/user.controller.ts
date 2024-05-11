import { dbClient, User, USER_TYPE } from "@/db/db.client";
import { NotFound } from "@/exceptions/error";
import { FastifyRequest, FastifyReply } from "fastify";
import { GuestResponseDto } from "../authentication/auth.types";

export async function CreateGuestUser(
  req: FastifyRequest<{ Params: { eventId: string } }>,
  reply: FastifyReply
) {
  const guestUser = await createGuestUser(req.params.eventId);

  const guestResponse = new GuestResponseDto(guestUser);
  const accessToken = await reply.jwtSign({ payload: guestResponse });

  guestResponse.addToken(accessToken);
  reply
    .status(201)
    .send({ message: "Guest user created", user: guestResponse });
}

export async function createGuestUser(eventId: string): Promise<User> {
  const event = await dbClient.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new NotFound(`Event: ${eventId} not found`);
  }

  const guestUser = await dbClient.user.create({
    data: {
      type: USER_TYPE.GUEST,
      companyId: event.companyId,
    },
  });

  return guestUser;
}
