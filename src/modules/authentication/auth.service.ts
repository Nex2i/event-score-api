import { USER_TYPE, dbClient } from "@/db/db.client";
import { AdminLoginResponseDto, RegisterDto } from "./auth.types";
import { BadRequest, Unauthorized } from "@/exceptions/error";
import { stripeRepository } from "@/libs/stripe/stripe.repository";
import { CreateStripeCustomer } from "@/libs/stripe/stripe.types";
import { cryptHash } from "@/libs/bcrypt";

export async function GetAuthenticatedUser(
  userId: string
): Promise<AdminLoginResponseDto> {
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

  const userResponse = new AdminLoginResponseDto(user, authUser);

  return userResponse;
}

export async function GetAuthenticatedBillingInfo(companyId: string) {
  const paymentInfo = await dbClient.companyPayment.findFirst({
    where: {
      companyId: companyId,
    },
  });

  if (!paymentInfo) {
    throw new BadRequest("No payment information found");
  }

  return paymentInfo.externalPaymentId;
}

export async function CreatePaymentCustomer(
  companyId: string,
  payload: RegisterDto
) {
  const stripeCustomer = await stripeRepository.createCustomer(
    new CreateStripeCustomer(payload, companyId)
  );

  if (!stripeCustomer.id) {
    throw new BadRequest(
      "Error creating customer, please contact support to report issue in registration"
    );
  }

  await dbClient.companyPayment.create({
    data: {
      companyId: companyId,
      externalPaymentId: stripeCustomer.id,
    },
  });

  return stripeCustomer.id;
}

export async function CreateNewUserAuth(
  userId: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  return await dbClient.userAuth
    .create({
      data: {
        userId: userId,
        email: email,
        phoneNumber: phoneNumber,
        hashedPassword: await cryptHash(password),
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });
}

export async function CreateNewAdminUser(companyId: string) {
  return await dbClient.user
    .create({
      data: {
        type: USER_TYPE.ADMIN,
        companyId: companyId,
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });
}

export async function CreateNewCompany(
  companyName: string,
  city: string,
  state: string,
  zip: string,
  streetAddress1: string,
  streetAddress2?: string
) {
  return await dbClient.company
    .create({
      data: {
        name: companyName,
        streetAddress1: streetAddress1,
        streetAddress2: streetAddress2,
        city: city,
        state: state,
        zip: zip,
      },
    })
    .catch((err) => {
      console.log("ERROR", err);
      throw new BadRequest(err.message);
    });
}
