import { errorCodesSchema, responseProperty } from "@/constants";
import { FastifySchema } from "fastify";
import { BaseCourseSchema } from "./Course.base.schema";

export const GetCourseSchema: FastifySchema = {
  ...BaseCourseSchema,
  description: "Course GET",
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
