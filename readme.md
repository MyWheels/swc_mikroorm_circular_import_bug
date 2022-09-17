# Swc + MikroORM circular import bug

This example repo reproduces the bug related to circular imports that arises with swc versions `1.2.206` and later in projects that use MikroORM.

The error:

```
[run] /Users/kelley/mywheels/swc_circular_import_bug/dist/models/User.js:7
[run]     get: ()=>User
[run]              ^
[run]
[run] ReferenceError: Cannot access 'User' before initialization
[run]     at Object.get [as User] (/Users/kelley/mywheels/swc_circular_import_bug/dist/models/User.js:7:14)
[run]     at Object.<anonymous> (/Users/kelley/mywheels/swc_circular_import_bug/dist/models/Reservation.js:34:44)
[run]     at Module._compile (node:internal/modules/cjs/loader:1103:14)
[run]     at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
[run]     at Module.load (node:internal/modules/cjs/loader:981:32)
[run]     at Function.Module._load (node:internal/modules/cjs/loader:822:12)
[run]     at Module.require (node:internal/modules/cjs/loader:1005:19)
[run]     at require (node:internal/modules/cjs/helpers:102:18)
[run]     at Object.<anonymous> (/Users/kelley/mywheels/swc_circular_import_bug/dist/models/User.js:10:22)
[run]     at Module._compile (node:internal/modules/cjs/loader:1103:14)
```

which is essentially caused by this line in the compiled code of `Reservation.ts`:

```
__metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
```

which is caused to `reflect-metadata`.

The error is volatile, and depens on the order in which files are imported. See `main.ts` to see various cases where the error doesn't occur.

Swc version `1.2.206` started compiling this line at the top of the file:

```
Object.defineProperty(exports, "Reservation", {
    enumerable: true,
    get: ()=>Reservation
});

...

class Reservation {
  ...
}
```

Whereas swc version `1.2.205` would compile this:

```
exports.Reservation = void 0;

...

class Reservation {
  ...
}

...

exports.Reservation = Reservation;
```
