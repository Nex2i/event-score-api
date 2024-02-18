import { Unauthorized } from "@/exceptions/error";
import { FastifyInstance, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  const authPreHandler = async (request: FastifyRequest) => {
    try {
      if (!request.headers?.authorization?.includes("Bearer")) {
        throw Error("No Authorization Header");
      }
      const authorization = request.headers.authorization.split(
        "Bearer "
      )[1] as string;

      const payload = fastify.jwt.verify(authorization);

      request.user = payload;
    } catch (error) {
      console.log("AUTH ERROR", error);
      throw new Unauthorized();
    }
  };
  fastify.decorate("authenticateGuestUser", authPreHandler);
});
