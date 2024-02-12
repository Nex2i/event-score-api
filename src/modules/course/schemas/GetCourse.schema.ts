import { errorCodesSchema, responseProperty } from "@/constants";
import { FastifySchema } from "fastify";

export const GetCourseSchema: FastifySchema = {
  description: "Course GET",
  tags: ["course"],
  response: {
    201: {
      description: "Successful login response",
      type: "object",
      properties: {
        ...responseProperty,
        data: {
          type: "object",
          properties: { accessToken: { type: "string" } },
        },
      },
    },
    ...errorCodesSchema,
  },
};
