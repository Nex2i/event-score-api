import { dbClient } from "@/db/db.client";
import { NotFound } from "@/exceptions/error";
import { CreateEvent } from "./event.types";
import { FastifyReply, FastifyRequest } from "fastify";

export async function CreateEvent(
  req: FastifyRequest<{ Body: CreateEvent }>,
  reply: FastifyReply
) {
  const { companyId, name, startDate, endDate } = req.body;
  console.log("Body", req.body);
  const newEvent = await dbClient.event.create({
    data: {
      companyId: companyId,
      name: name,
      startDate: startDate,
      endDate: endDate,
    },
  });
  console.log("New Event", newEvent);
  reply.status(201).send({ message: "Event created", event: newEvent });
}

export async function GetEvent(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const event = await dbClient.event.findUnique({
    where: { id: id },
    include: {
      Courses: true,
    },
  });

  if (!event) throw new NotFound("Event not found: " + id);

  reply.send({ event });
}
