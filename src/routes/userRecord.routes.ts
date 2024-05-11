import { PostUserShotSchema } from "@/modules/userRecord/schemas/PostUserShot.schema";
import { RecordUserShot } from "@/modules/userRecord/userRecord.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const userPath = "/user-record";

export default async function User(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "POST",
    url: `${userPath}/course/submit/:eventId`,
    handler: RecordUserShot,
    schema: PostUserShotSchema,
    // preHandler: [fastify.authenticateGuestUser],
  });
}
