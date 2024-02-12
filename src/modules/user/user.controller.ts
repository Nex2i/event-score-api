import { dbClient } from "@/db/db.client";
import { FastifyRequest, FastifyReply } from "fastify";
import { userTypes } from "./user.constants";

export async function CreateGuestUser(
  req: FastifyRequest<{ Params: { event: string } }>,
  reply: FastifyReply
) {
  const guestUser = await dbClient.user.create({
    data: {
      type: userTypes.GUEST,
    },
  });

  const accessToken = await reply.jwtSign({ payload: guestUser });
  reply
    .status(201)
    .send({ message: "Guest user created", guestUser, accessToken });
}
