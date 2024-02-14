import { errorCodesSchema } from "@/constants";
import {
  AuthLogin,
  AuthRegister,
} from "@/modules/authentication/authentication.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const authenticationPath = "/auth";

export default async function Authentication(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "POST",
    url: `${authenticationPath}/login`,
    handler: AuthLogin,
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      ...errorCodesSchema,
    },
  });

  fastify.route({
    method: "POST",
    url: `${authenticationPath}/register`,
    handler: AuthRegister,
  });
}
