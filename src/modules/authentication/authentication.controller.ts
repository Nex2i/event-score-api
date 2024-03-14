import { dbClient } from "@/db/db.client";
import { BadRequest, NotFound, Unauthorized } from "@/exceptions/error";
import { stringMatchesHash } from "@/libs/bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  AuthDto,
  RegisterDto,
  isValidAuthDto,
  AdminRegisterResponseDto,
} from "./auth.types";
import {
  CreateNewAdminUser,
  CreateNewCompany,
  CreateNewUserAuth,
  CreatePaymentCustomer,
  GetAuthenticatedBillingInfo,
  GetAuthenticatedUser,
} from "./auth.service";
import { stripeRepository } from "@/libs/stripe/stripe.repository";

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
    throw new Unauthorized("User is not valid");
  }

  const userResponse = await GetAuthenticatedUser(user.userId);

  const paymentId = await GetAuthenticatedBillingInfo(user.companyId);

  userResponse.addPaymentId(paymentId);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { user: userResponse };
}

export async function AuthLogout(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return reply.send({ message: "Logged out successfully" });
  }
  reply.send({ message: "Logged out successfully" });
}

export async function AuthRegister(
  req: FastifyRequest<{ Body: RegisterDto }>,
  reply: FastifyReply
) {
  const {
    companyName,
    streetAddress1,
    streetAddress2,
    city,
    state,
    zip,
    email,
    phoneNumber,
    password,
  } = req.body;

  const newCompany = await CreateNewCompany(
    companyName,
    city,
    state,
    zip,
    streetAddress1,
    streetAddress2
  );

  const newUser = await CreateNewAdminUser(newCompany.id);

  const newUserAuth = await CreateNewUserAuth(
    newUser.id,
    email,
    phoneNumber,
    password
  );

  const paymentId = await CreatePaymentCustomer(newCompany.id, req.body);

  const userResponse = new AdminRegisterResponseDto(newUser, newUserAuth);

  userResponse.addPaymentId(paymentId);

  const initCheckoutUrl = await stripeRepository.getInitCheckoutUrl(paymentId);

  userResponse.addCheckoutUrl(initCheckoutUrl);

  const accessToken = await reply.jwtSign({ payload: userResponse });

  userResponse.addToken(accessToken);

  return { message: "Register", user: userResponse };
}
