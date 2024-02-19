import { dbClient } from "@/db/db.client";
import { BadRequest, NotFound, Unauthorized } from "@/exceptions/error";
import { cryptHash, stringMatchesHash } from "@/libs/bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  AuthDto,
  AdminLoginResponseDto,
  RegisterDto,
  isValidAuthDto,
} from "./auth.types";
import { GetAuthenticatedUser } from "./auth.service";

// in-memory store for simplicity
let blacklistedTokens = new Set();

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

  const userResponse = await GetAuthenticatedUser(requestedUserAuth.userId);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { user: userResponse };
}

export async function AuthCheck(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as AuthDto;

  if (!user || !isValidAuthDto(user)) {
    throw new Unauthorized();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (token && blacklistedTokens.has(token)) {
    throw new Unauthorized("Token is invalidated");
  }

  const userResponse = await GetAuthenticatedUser(user.userId);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { user: userResponse };
}

export async function AuthLogout(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return reply.send({ message: "Logged out successfully" });
  }
  // Add the token to the blacklist
  blacklistedTokens.add(token);
  reply.send({ message: "Logged out successfully" });
}

export async function AuthRegister(
  req: FastifyRequest<{ Body: RegisterDto }>,
  reply: FastifyReply
) {
  const newCompany = await dbClient.company
    .create({
      data: {
        name: req.body.companyName,
        streetAddress1: req.body.streetAddress1,
        streetAddress2: req.body.streetAddress2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });

  const newUser = await dbClient.user
    .create({
      data: {
        type: req.body.userType,
        companyId: newCompany.id,
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });

  const newUserAuth = await dbClient.userAuth
    .create({
      data: {
        userId: newUser.id,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hashedPassword: await cryptHash(req.body.password),
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });

  const userResponse = new AdminLoginResponseDto(newUser, newUserAuth);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { message: "Register", user: userResponse };
}
