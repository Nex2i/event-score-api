export interface Course {
  id: string;
  name: string;
  eventId: string;
}

export interface CreateCourse extends Course {}
