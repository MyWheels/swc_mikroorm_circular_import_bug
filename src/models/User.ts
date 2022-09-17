import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { Reservation } from "./Reservation";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations = new Collection<Reservation>(this);
}
