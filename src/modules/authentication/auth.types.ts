import { USER_TYPE, User, UserAuth } from "@/db/db.client";

export class AuthDto {
  token: string = "";
  userId: string = "";
  phoneNumber: string | null = null;
  email: string = "";
  companyId: string = "";
  userType: USER_TYPE = USER_TYPE.GUEST;
  paymentId: string = "";
}

export function isValidAuthDto(authDto: AuthDto): boolean {
  return authDto.email !== "" && authDto.companyId !== "";
}

export class GuestResponseDto extends AuthDto {
  constructor(user: User) {
    super();
    this.userId = user.id;
    this.companyId = user.companyId;
    this.userType = USER_TYPE.GUEST;
  }
  addToken(token: string) {
    this.token = token;
  }
}

export class AdminLoginResponseDto extends AuthDto {
  constructor(user: User, authUser: UserAuth) {
    super();
    this.email = authUser.email;
    this.phoneNumber = authUser.phoneNumber;
    this.companyId = user.companyId;
    this.userType = user.type;
    this.userId = user.id;
    this.userType = USER_TYPE.ADMIN;
  }

  addToken(token: string) {
    this.token = token;
  }

  addPaymentId(paymentId: string) {
    this.paymentId = paymentId;
  }
}

export class RegisterDto {
  companyName: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  phoneNumber: string = "";
  password: string = "";
  streetAddress1: string = "";
  streetAddress2?: string;
  city: string = "";
  state: string = "";
  zip: string = "";
  userType: USER_TYPE = USER_TYPE.ADMIN;
}
