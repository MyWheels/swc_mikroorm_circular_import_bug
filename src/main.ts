import "reflect-metadata";
import path from "path";
import { MikroORM } from "@mikro-orm/core";

import { Reservation } from "./models/Reservation";
import { User } from "./models/User";

async function main() {
  await MikroORM.init({
    // debug: true,
    clientUrl: "postgres://fake:5432",
    entities: [path.join(__dirname, "./models/**")],
    type: "postgresql",
  });

  // Doesn't error:
  // console.log("Hello", new Reservation(), new User());

  // Doesn't error:
  // console.log("Hello", new User(), new Reservation());

  // Doesn't error:
  // console.log("Hello", new Reservation());

  // Does error:
  console.log("Hello", new User());
  // ReferenceError: Cannot access 'User' before initialization [User.js:7]
}

main();
