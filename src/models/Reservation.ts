import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class Reservation {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => User, {
    wrappedReference: true,
  })
  user!: User;
}
