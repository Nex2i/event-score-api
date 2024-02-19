import { dbClient } from "@/db/db.client";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetAdminEventLeaderboard(
  req: FastifyRequest<{ Querystring: { eventId: string } }>,
  reply: FastifyReply
) {
  const { eventId } = req.query;

  const courseRecords = await getUserLeaderboard(eventId);

  const averageUserShot = await getAverageUserShotByEventId(eventId);

  reply.send({ courseRecords, averageUserShot });
}

export async function GetGuestEventLeaderboard(
  req: FastifyRequest<{ Querystring: { eventId: string } }>,
  reply: FastifyReply
) {
  const { eventId } = req.query;

  const courseRecords = await getUserLeaderboard(eventId);

  reply.send({ courseRecords });
}

const getUserLeaderboard = async (eventId: string) => {
  return await dbClient.userCourseRecord.findMany({
    where: {
      Course: {
        eventId: eventId,
      },
    },
    include: {
      User: true, // Optional: Include User details
    },
    orderBy: {
      totalScore: "desc", // Orders by totalScore in descending order
    },
  });
};

const getAverageUserShotByEventId = async (eventId: string) => {
  const targets = await dbClient.target.findMany({
    where: {
      Course: {
        eventId: eventId,
      },
    },
    select: {
      id: true,
      name: true,
      orderIndex: true,
    },
    orderBy: {
      orderIndex: "asc",
    },
  });

  // Then, for each target, calculate the average score of UserShots
  const averages = await Promise.all(
    targets.map(async (target) => {
      const averageScore = await dbClient.userShot.aggregate({
        _avg: {
          score: true,
        },
        where: {
          targetId: target.id,
        },
      });

      return {
        targetId: target.id,
        targetName: target.name,
        orderIndex: target.orderIndex,
        averageScore: averageScore._avg.score,
      };
    })
  );

  // Finally, sort the results by orderIndex
  return averages.sort((a, b) => a.orderIndex - b.orderIndex);
};
