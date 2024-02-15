import { dbClient } from "@/db/db.client";
import { LoginResponseDto } from "./auth.types";
import { Unauthorized } from "@/exceptions/error";

export async function GetAuthenticatedUser(
  userId: string
): Promise<LoginResponseDto> {
  const authUser = await dbClient.userAuth.findFirst({
    where: {
      userId: userId,
    },
  });

  const user = await dbClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!authUser || !user) {
    throw new Unauthorized("User not found");
  }

  const userResponse = new LoginResponseDto(user, authUser);

  return userResponse;
}
