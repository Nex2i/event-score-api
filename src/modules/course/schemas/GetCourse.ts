import {
  ERROR400,
  ERROR401,
  ERROR404,
  ERROR409,
  ERROR500,
  responseProperty,
} from "@/constants";
import { FastifySchema } from "fastify";

export const GetCourseSchema: FastifySchema = {
  description: "Course GET",
  tags: ["coiurse"],
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
    400: ERROR400,
    401: ERROR401,
    404: ERROR404,
    409: ERROR409,
    500: ERROR500,
  },
};
