export const sharedEventResponse = {
  event: {
    $id: "sharedEventResponse",
    type: "object",
    properties: {
      id: { type: "string" },
      companyId: { type: "string" },
      name: { type: "string" },
      startDate: { type: "string", format: "date-time" },
      endDate: { type: "string", format: "date-time" },
      Courses: {},
    },
  },
};
