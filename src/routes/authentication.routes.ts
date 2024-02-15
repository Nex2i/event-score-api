import { errorCodesSchema } from "@/constants";
import { USER_TYPE } from "@/db/db.client";
import {
  AuthCheck,
  AuthLogin,
  AuthLogout,
  AuthRegister,
} from "@/modules/authentication/authentication.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const authenticationPath = "/auth";

export default async function Authentication(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${authenticationPath}`,
    handler: AuthCheck,
    preHandler: [fastify.authenticateUser],
  });

  fastify.route({
    method: "DELETE",
    url: `${authenticationPath}/logout`,
    handler: AuthLogout,
  });

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
    schema: {
      body: {
        type: "object",
        required: [
          "companyName",
          "email",
          "phoneNumber",
          "password",
          "streetAddress1",
          "city",
          "state",
          "zipCode",
        ],
        properties: {
          companyName: { type: "string" },
          email: { type: "string" },
          phoneNumber: { type: "string" },
          password: { type: "string" },
          streetAddress1: { type: "string" },
          streetAddress2: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zipCode: { type: "string" },
          userType: { type: "string", default: USER_TYPE.ADMIN },
        },
      },
      ...errorCodesSchema,
    },
  });
}
