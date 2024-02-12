import { PostUserShotSchema } from "@/modules/user/schemas/PostUserShot.schema";
import {
  CreateGuestUser,
  RecordUserShot,
} from "@/modules/user/user.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const userPath = "/user";

export default async function User(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "POST",
    url: `${userPath}/shot`,
    handler: RecordUserShot,
    schema: PostUserShotSchema,
    preHandler: [fastify.authenticateUser],
  });

  fastify.route({
    method: "POST",
    url: `${userPath}/guest`,
    handler: CreateGuestUser,
  });
}
