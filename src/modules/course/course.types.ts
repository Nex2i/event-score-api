import { Target } from "@modules/target/target.types";

export interface Course {
  id: string;
  name: string;
  eventId: string;
  targets: Target[];
}

export interface CreateCourse extends Course {}
