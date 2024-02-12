import { errorCodesSchema, responseProperty } from "@/constants";
import { FastifySchema } from "fastify";

export const CreateEventSchema: FastifySchema = {
  description: "Event POST",
  tags: ["event"],
  body: {
    type: "object",
    required: ["companyId", "name", "startDate", "endDate"],
    properties: {
      companyId: { type: "string" },
      name: { type: "string" },
      startDate: { type: "string", format: "date-time" },
      endDate: { type: "string", format: "date-time" },
    },
  },
  response: {
    201: {
      description: "Event created",
      type: "object",
      properties: {
        ...responseProperty,
      },
    },
    ...errorCodesSchema,
  },
};
