import { GetCourse } from "@/controllers/course.controller";
import { GetCourseSchema } from "@/modules/course/schemas/GetCourse";
import { FastifyInstance, RouteOptions } from "fastify";

const coursePath = "/course";

export default async function Course(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${coursePath}/:id`,
    schema: GetCourseSchema,
    handler: GetCourse,
  });
}
