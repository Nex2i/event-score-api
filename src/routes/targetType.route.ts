import { FastifyInstance, RouteOptions } from "fastify";

const targetTypePath = "/targetType";

export default async function TargetType(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${targetTypePath}/:id`,
    handler: async (req, reply) => {
      reply.send({ message: "Hello from get target type route" });
    },
    schema: {
      params: {
        id: { type: "string" },
      },
    },
  });

  fastify.route({
    method: "GET",
    url: `${targetTypePath}/`,
    schema: {
      querystring: {
        template: { type: "string" },
      },
    },
    handler: async (req, reply) => {
      reply.send({ message: "Hello from get all target types route" });
    },
  });

  fastify.route({
    method: "POST",
    url: `${targetTypePath}/`,
    handler: async (req, reply) => {
      reply.send({ message: "Hello from create target type route" });
    },
  });
}
