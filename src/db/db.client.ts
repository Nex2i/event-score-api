import {
  Company,
  Event,
  Course,
  Target,
  Shot,
  TargetType,
  TargetTypeRing,
} from "@prisma/client";
import { prisma } from "./prisma.client";

export const dbClient = prisma;

export { Company, Event, Course, Target, Shot, TargetType, TargetTypeRing };
