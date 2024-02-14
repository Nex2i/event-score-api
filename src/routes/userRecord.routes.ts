import { PostUserShotSchema } from "@/modules/user/schemas/PostUserShot.schema";
import { RecordUserShot } from "@/modules/user/userRecord.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const userPath = "/user-record";

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
}
