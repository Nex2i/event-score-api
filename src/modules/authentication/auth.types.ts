import { USER_TYPE, User, UserAuth } from "@/db/db.client";

export class LoginDto {
  token: string = "";
  email: string = "";
  company: string = "";
  userType: USER_TYPE = USER_TYPE.GUEST;
}

export class LoginResponseDto extends LoginDto {
  constructor(user: User, authUser: UserAuth) {
    super();
    this.email = authUser.email;
    this.company = user.companyId;
    this.userType = user.type;
  }

  addToken(token: string) {
    this.token = token;
  }
}
