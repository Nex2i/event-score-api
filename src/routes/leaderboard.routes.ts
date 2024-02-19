import {
  GetAdminEventLeaderboard,
  GetGuestEventLeaderboard,
} from "@/modules/leaderboard/leaderboard.controller";
import { FastifyInstance, RouteOptions } from "fastify";

const leaderboardPath = "/leaderboard";

export default async function Leaderboard(
  fastify: FastifyInstance,
  opts: RouteOptions
) {
  fastify.route({
    method: "GET",
    url: `${leaderboardPath}/admin`,
    schema: {
      querystring: {
        type: "object",
        properties: {
          eventId: { type: "string" },
        },
      },
    },
    handler: GetAdminEventLeaderboard,
  });

  fastify.route({
    method: "GET",
    url: `${leaderboardPath}/guest`,
    schema: {
      querystring: {
        type: "object",
        properties: {
          eventId: { type: "string" },
        },
      },
    },
    handler: GetGuestEventLeaderboard,
  });
}
