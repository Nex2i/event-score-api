import { dbClient } from "@/db/db.client";
import { Unauthorized } from "@/exceptions/error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetCourse(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  if (id === "0")
    throw new Unauthorized("You are not authorized to access this resource");

  const course = await dbClient.course.findUnique({
    where: { id: id },
  });
  reply.send({ course });
}
