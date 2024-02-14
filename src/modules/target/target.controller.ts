import { dbClient } from "@/db/db.client";
import { FastifyRequest, FastifyReply } from "fastify";

export async function GetTarget(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const target = await dbClient.target.findUnique({
    where: { id: req.params.id },
    include: {
      Shots: true,
      TargetType: {
        include: {
          TargetTypeRings: true,
        },
      },
    },
  });
  reply.send({ message: "Target Fetched", target });
}

export async function GetCourseTargets(
  req: FastifyRequest<{ Querystring: { courseId: string } }>,
  reply: FastifyReply
) {
  const { courseId } = req.query;
  const targets = await dbClient.target
    .findMany({
      where: { courseId: courseId },
      include: {
        Shots: true,
        TargetType: true,
      },
    })
    .catch((err) => {
      reply.send({ message: "Error fetching targets", error: err });
    });
  reply.send({ message: "Course Targets Fetched", targets: targets });
}

export async function CreateTarget(req: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: "Hello from create target route" });
}
