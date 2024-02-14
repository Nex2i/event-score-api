import {
  CreateTarget,
  GetCourseTargets,
  GetTarget,
} from "@/modules/target/target.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const targetPath = "/target";

export default async function Target(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${targetPath}/:id`,
    handler: GetTarget,
    schema: {
      params: {
        id: { type: "string" },
      },
    },
  });

  fastify.route({
    method: "GET",
    url: `${targetPath}/`,
    handler: GetCourseTargets,
    schema: {
      querystring: {
        courseId: { type: "string" },
      },
    },
  });

  fastify.route({
    method: "POST",
    url: `${targetPath}/`,
    handler: CreateTarget,
  });
}
