import { dbClient } from "@/db/db.client";
import { NotFound } from "@/exceptions/error";
import { CreateEvent } from "./event.types";
import { FastifyReply, FastifyRequest } from "fastify";

export async function CreateEvent(
  req: FastifyRequest<{ Body: CreateEvent }>,
  reply: FastifyReply
) {
  reply.status(201).send({ message: "Event created" });
}

export async function GetEvent(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const event = await dbClient.event.findUnique({
    where: { id: id },
  });

  if (!event) throw new NotFound("Event not found: " + id);

  reply.send({ event });
}
