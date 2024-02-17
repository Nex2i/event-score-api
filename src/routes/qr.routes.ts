import { RecordEventQr } from "@/modules/qr/qr.controller";
import { FastifyInstance, RouteOptions } from "fastify";

export default async function Qr(fastify: FastifyInstance, opts: RouteOptions) {
  fastify.route({
    method: "GET",
    url: "/qr/event/:id",
    handler: RecordEventQr,
  });
}
