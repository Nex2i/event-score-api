import { CreateEvent, GetEvent } from "@/modules/event/event.controller";
import { CreateEventSchema } from "@/modules/event/schemas/CreateEvent.schema";
import { FastifyInstance, RouteOptions } from "fastify";

const eventPath = "/event";

export default async function Event(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${eventPath}/:id`,
    handler: GetEvent,
  });

  fastify.route({
    method: "POST",
    url: `${eventPath}/`,
    handler: CreateEvent,
    schema: CreateEventSchema,
  });
}
