import { FastifySchema } from "fastify";
import { sharedEventResponse } from ".";
import {
  responseProperty,
  errorCodesSchema,
} from "../../../constants/error-codes";

export const GetEventSchema: FastifySchema = {
  description: "Event GET",
  tags: ["event"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Event found",
      type: "object",
      properties: {
        ...responseProperty,
        ...sharedEventResponse,
      },
    },
    ...errorCodesSchema,
  },
};
