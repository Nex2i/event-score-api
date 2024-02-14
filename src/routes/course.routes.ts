import {
  CreateCourse,
  GetAllCourses,
  GetCourse,
} from "@/modules/course/course.controller";
import { BaseCourseSchema } from "@/modules/course/schemas/Course.base.schema";
import { CreateCourseSchema } from "@/modules/course/schemas/CreateCourse.schema";
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
    schema: BaseCourseSchema,
  });

  fastify.route({
    method: "POST",
    url: `${coursePath}/`,
    handler: CreateCourse,
    schema: CreateCourseSchema,
  });
}
