import { dbClient } from "@/db/db.client";
import { CreateCourse } from "./course.types";
import { NotFound } from "@/exceptions/error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetCourse(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;

  const course = await dbClient.course.findFirst({
    where: { id: id },
    include: {
      Targets: {
        include: {
          Shots: true,
        },
      },
    },
  });

  if (!course) {
    throw new NotFound("Course not found: " + id);
  }
  reply.send({ course });
}

export async function GetAllCourses(req: FastifyRequest, reply: FastifyReply) {
  const courses = await dbClient.course.findMany();
  reply.send({ courses });
}

export async function CreateCourse(
  req: FastifyRequest<{ Body: CreateCourse }>,
  reply: FastifyReply
) {
  const { name, eventId, targets } = req.body;

  const targetsCreate = targets.map((target) => ({
    name: target.name,
    distance: target.distance,
    targetTypeId: target.targetTypeId,
    Shots: {
      create: target.shots.map((_shot) => ({})),
    },
  }));

  const newCourse = await dbClient.course.create({
    data: {
      eventId,
      name,
      Targets: {
        create: targetsCreate,
      },
    },
    include: {
      Targets: {
        include: {
          Shots: true,
        },
      },
    },
  });

  reply.send({ course: newCourse });
}
