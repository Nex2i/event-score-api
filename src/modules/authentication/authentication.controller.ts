import { dbClient } from "@/db/db.client";
import { BadRequest, NotFound } from "@/exceptions/error";
import { stringMatchesHash } from "@/libs/bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import { LoginResponseDto } from "./auth.types";

export async function AuthLogin(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const requestedUserAuth = await dbClient.userAuth.findFirst({
    where: { email: req.body.email },
  });

  if (!requestedUserAuth) {
    throw new NotFound(`User: ${req.body.email} not found`);
  }

  const passwordMatches = await stringMatchesHash(
    req.body.password,
    requestedUserAuth.hashedPassword
  );

  if (!passwordMatches) {
    throw new BadRequest();
  }

  const authorizedUser = await dbClient.user.findUnique({
    where: { id: requestedUserAuth.userId },
  });

  if (!authorizedUser) {
    throw new NotFound(`User: ${req.body.email} not found`);
  }

  const userResponse = new LoginResponseDto(authorizedUser, requestedUserAuth);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { user: userResponse };
}

export async function AuthRegister(req: FastifyRequest, reply: FastifyReply) {
  return { message: "Register" };
}
