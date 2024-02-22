import { AccountStatus, dbClient } from "../db.client";

class CompanyPaymentRepository {
  public async setAccountActiveFromExternalId(externalCustomerId: string) {
    await dbClient.companyPayment.update({
      where: {
        externalPaymentId: externalCustomerId,
      },
      data: {
        accountStatus: AccountStatus.ACTIVE,
      },
    });
  }
}

export const companyPaymentRepository = new CompanyPaymentRepository();
