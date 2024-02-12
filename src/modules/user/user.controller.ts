import { dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";
import { userTypes } from "./user.constants";

export async function RecordUserShot(
  req: FastifyRequest<{ Querystring: { shotId: string; score: string } }>,
  reply: FastifyReply
) {
  const { id: userId } = req.user as { id: string };
  const { shotId, score } = req.query;
  const courseShot = await dbClient.shot.findUnique({
    where: { id: shotId },
  });

  if (!courseShot) {
    return reply.status(404).send({ message: "Shot not found" });
  }

  await dbClient.userShot.create({
    data: {
      userId: userId,
      shotId: shotId,
      targetId: courseShot.targetId,
      score: parseInt(score),
    },
  });
  reply.send({ message: "Shot recorded" });
}

export async function CreateGuestUser(
  _req: FastifyRequest,
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
