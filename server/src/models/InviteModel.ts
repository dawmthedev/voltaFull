import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Property } from "@tsed/schema";

@Model({ name: "invites" })
export class InviteModel {
  @ObjectID("id")
  _id: string;

  @Property()
  email: string;

  @Property()
  name: string;

  @Property()
  phone?: string;

  @Property()
  role: string;

  @Property()
  sender: string;

  @Property()
  @Default(() => new Date())
  invitedAt: Date;

  @Property()
  @Default("pending")
  status: "pending" | "accepted" | "expired";
}
