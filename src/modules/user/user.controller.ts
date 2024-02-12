import { dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";
import { userTypes } from "./user.constants";

export async function RecordUserShot(
  req: FastifyRequest<{
    Querystring: { shotId: string; score: string; targetId: string };
  }>,
  reply: FastifyReply
) {
  const { id: userId } = (req.user as { payload: { id: string } }).payload;
  const { shotId, score, targetId } = req.query;
  const courseShot = await dbClient.shot.findUnique({
    where: { id: shotId },
  });

  if (!courseShot) {
    return reply.status(404).send({ message: "Shot not found" });
  }

  const newShot = await dbClient.userShot.create({
    data: {
      userId: userId,
      shotId: shotId,
      targetId: targetId,
      score: parseInt(score),
    },
  });
  reply.send({ message: "Shot recorded", shot: newShot });
}

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
