import {
  ERROR400,
  ERROR401,
  ERROR404,
  ERROR409,
  ERROR500,
  responseProperty,
} from "@/constants";

import { FastifySchema } from "fastify";

export const PostUserShotSchema: FastifySchema = {
  description: "User shot POST",
  tags: ["user"],
  querystring: {
    type: "object",
    required: ["shotId", "score", "targetId"],
    properties: {
      shotId: { type: "string" },
      targetId: { type: "string" },
      score: { type: "string" },
    },
  },
  response: {
    201: {
      description: "Successful shot record response",
      type: "object",
      properties: {
        ...responseProperty,
      },
    },
    400: ERROR400,
    401: ERROR401,
    404: ERROR404,
    409: ERROR409,
    500: ERROR500,
  },
};
