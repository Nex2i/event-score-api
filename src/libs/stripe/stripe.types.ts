import { Address } from "@/interfaces/Address.type";
import { RegisterDto } from "@/modules/authentication/auth.types";

export class CreateStripeCustomer {
  constructor(payload: RegisterDto, companyId: string) {
    this.email = payload.email;
    this.name = `${payload.firstName} ${payload.lastName}`;
    this.companyId = companyId;
    this.address = {
      street1: payload.streetAddress1,
      street2: payload.streetAddress2,
      postalCode: payload.zip,
      city: payload.city,
      state: payload.state,
    };
    this.phone = payload.phoneNumber;
  }

  email: string;
  phone: string;
  name: string;
  companyId: string;
  address: Address;
}
