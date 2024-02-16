import { Shot } from "@modules/shot/shot.types";

export interface Target {
  name: string;
  distance: number;
  targetTypeId: string;
  shots: Shot[];
}
