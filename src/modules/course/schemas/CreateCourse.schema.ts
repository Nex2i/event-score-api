import { FastifySchema } from "fastify";
import { BaseCourseSchema } from "./Course.base.schema";
import { errorCodesSchema } from "../../../constants/error-codes";

export const CreateCourseSchema: FastifySchema = {
  ...BaseCourseSchema,
  description: "Course POST",
  body: {
    type: "object",
    required: ["name", "eventId"],
    properties: {
      name: { type: "string" },
      eventId: { type: "string" },
    },
  },
  response: {
    201: {
      description: "Successful course creation response",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    ...errorCodesSchema,
  },
};
