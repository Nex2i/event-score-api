import { Unauthorized } from "@/exceptions/error";
import { FastifyInstance, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const authPreHandler = async (request: FastifyRequest) => {
    try {
      if (!request.headers?.authorization?.includes("Bearer")) {
        throw Error("No Authorization Header");
      }

      const payload = await request.jwtVerify();

      request.user = payload;
    } catch (error) {
      console.log("AUTH ERROR", error, request?.headers?.authorization);
      throw new Unauthorized();
    }
  };
  fastify.decorate("authenticateGuestUser", authPreHandler);
});
