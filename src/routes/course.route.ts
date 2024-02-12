import { GetAllCourses, GetCourse } from "@/modules/course/course.controller";
import { GetCourseSchema } from "@/modules/course/schemas/GetCourse.schema";
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

  fastify.route({
    method: "GET",
    url: `${coursePath}/`,
    handler: GetAllCourses,
  });
}
