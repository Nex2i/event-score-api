import { UserShot, dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  UserCourseDataModel,
  UserTargetDataModel,
} from "./types/userCourseModel";

export async function RecordUserShot(
  req: FastifyRequest<{
    Body: UserCourseDataModel;
  }>,
  reply: FastifyReply
) {
  const { userId } = (req.user as { payload: { userId: string } }).payload;
  const { courseId, targets, totalScore } = req.body;

  await dbClient.userCourseRecord.create({
    data: {
      courseId,
      userId,
      totalScore,
    },
  });

  const flattenShots = flattenShotsWithSchema(targets, userId);

  // Prepare upsert operations for each shot
  const upsertPromises = flattenShots.map((shot) =>
    dbClient.userShot.upsert({
      where: {
        // Assuming a unique constraint on userId and shotId
        userId_shotId: {
          userId: shot.userId,
          shotId: shot.shotId,
        },
      },
      update: {
        ...shot,
      },
      create: {
        ...shot,
      },
    })
  );

  // Execute all upsert operations within a transaction
  await dbClient.$transaction(upsertPromises);

  reply.code(201).send({ message: "Course submitted successfully" });
}

function flattenShotsWithSchema(
  targets: UserTargetDataModel[],
  userId: string
): UserShot[] {
  return targets.flatMap((target) =>
    target.shots.map((shot) => ({
      score: shot.score,
      userId: userId,
      shotId: shot.shotId,
      targetId: target.targetId,
    }))
  ) as UserShot[];
}
