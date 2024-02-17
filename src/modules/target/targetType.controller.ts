import { TargetType, TargetTypeRing, dbClient } from "@/db/db.client";
import { NotFound } from "@/exceptions/error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetTargetRings(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = req.params;

  const targetType = await dbClient.targetType.findUnique({
    where: { id },
    include: { TargetTypeRings: true },
  });

  if (!targetType) throw new NotFound("Target type not found: " + id);

  const rings = mapTargetTypeToRings(targetType);

  reply.send({ rings });
}

export async function GetTargetRingsByTargetId(
  req: FastifyRequest<{ Querystring: { targetId: string } }>,
  reply: FastifyReply
) {
  const { targetId } = req.query;

  const target = await dbClient.target.findUnique({
    where: { id: targetId },
    include: {
      TargetType: {
        include: {
          TargetTypeRings: true,
        },
      },
    },
  });

  if (!target) throw new NotFound("Target not found: " + targetId);

  const rings = mapTargetTypeToRings(target.TargetType);

  reply.send({ rings });
}

type dbRingSchema = {
  TargetTypeRings: TargetTypeRing[];
} & TargetType;

function mapTargetTypeToRings(targetType: dbRingSchema) {
  return {
    id: targetType.id,
    rings: targetType.TargetTypeRings.sort(
      (a, b) => b.orderIndex - a.orderIndex
    ).map((r) => ({
      id: r.id,
      color: r.color,
      value: r.value,
    })),
  };
}
