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

  const eventWithTargetsAndShots = await dbClient.event.findFirst({
    where: {
      companyId: id,
    },
    include: {
      Courses: {
        include: {
          Targets: {
            include: {
              Shots: true, // Retrieves all fields from Shots
            },
          },
        },
      },
    },
  });
  reply.send({ course, eventWithTargetsAndShots });
}

export async function GetAllCourses(req: FastifyRequest, reply: FastifyReply) {
  const courses = await dbClient.course.findMany();
  reply.send({ courses });
}
