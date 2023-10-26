import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Enum, Property } from "@tsed/schema";

enum TypeEnum {
  EMAIL = "email",
  PASSWORD = "password"
}

@Model()
export class VerificationModel {
  @ObjectID("id")
  _id: string;

  @Property()
  email: string;

  @Property()
  @Default(false)
  verified: boolean;

  @Property()
  code: string;

  @Property()
  @Default(new Date(Date.now() + 24 * 60 * 60 * 1000))
  expiry: Date;

  @Enum(TypeEnum)
  type: TypeEnum;

  @Property()
  @Default(new Date())
  createdAt: Date;

  @Property()
  @Default(new Date())
  updatedAt: Date;
}
