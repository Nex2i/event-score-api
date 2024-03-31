import { FastifyInstance, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

import { Unauthorized } from "@exceptions/error";
import { USER_TYPE } from "@/db/db.client";
import { AuthDto } from "@/modules/authentication/auth.types";

export default fastifyPlugin(async (fastify: FastifyInstance, _: unknown) => {
  const authPreHandler = async (request: FastifyRequest) => {
    try {
      if (!request.headers?.authorization?.includes("Bearer")) {
        throw Error("No Authorization Header");
      }

      const { payload } = (await request.jwtVerify()) as {
        payload: AuthDto;
      };

      if (payload.userType !== USER_TYPE.ADMIN)
        throw new Unauthorized("User not admin");

      request.user = payload;
    } catch (error) {
      console.log("AUTH ERROR", error);
      throw new Unauthorized(
        "There was an error: \n" +
          JSON.stringify(request?.headers?.authorization) +
          "\n" +
          error
      );
    }
  };
  fastify.decorate("authenticateUser", authPreHandler);
});
