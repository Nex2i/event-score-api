import { errorCodesSchema, responseProperty } from "@/constants";

import { FastifySchema } from "fastify";

export const PostUserShotSchema: FastifySchema = {
  description: "User shot POST",
  tags: ["user"],
  response: {
    201: {
      description: "Successful shot record response",
      type: "object",
      properties: {
        ...responseProperty,
      },
    },
    ...errorCodesSchema,
  },
};
