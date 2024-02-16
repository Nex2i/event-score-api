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
      targets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            distance: { type: "number" },
            targetTypeId: { type: "string" },
            shots: {
              type: "array",
              items: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
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
