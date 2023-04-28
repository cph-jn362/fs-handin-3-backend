import { Tenant } from "src/auth/entities/tenant.entity";

export class CreateProblemDTO {
  tenant: Tenant;
  constructor(
    public subject: string,
    public description: string,
    public imgUrl?: string,
  ) {}
}
