import { CreateGuestUser } from "@/modules/user/user.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const userPath = "/user";

export default async function User(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "POST",
    url: `${userPath}/guest`,
    handler: CreateGuestUser,
    schema: {
      params: {
        type: "object",
        properties: {
          eventId: { type: "string" },
        },
      },
    },
  });
}
