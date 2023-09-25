/*
 * File: @mas/shared/src/ioc/tests/example.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 04:45 pm
 *
 * Last Modified: 09/25/2023 04:14 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { describe, expect, it } from "vitest";

import { Container, inject, injectable } from "@mas/shared/ioc";

// InversifyJS is a lightweight (4KB) inversion of control (IoC) container
// for TypeScript and JavaScript apps.
describe("https://github.com/inversify/inversify-basic-example", () => {
    // symbols

    type Warrior = {
        fight(): string;
        sneak(): string;
    };
    const Warrior = Symbol("Warrior");

    type Weapon = {
        hit(): string;
    };
    const Weapon = Symbol("Weapon");

    type ThrowableWeapon = {
        throw(): string;
    };
    const ThrowableWeapon = Symbol("ThrowableWeapon");

    @injectable()
    class Katana implements Weapon {
        hit(): string {
            return "cut!";
        }
    }

    @injectable()
    class Shuriken implements ThrowableWeapon {
        throw(): string {
            return "hit!";
        }
    }

    @injectable()
    class Ninja implements Warrior {
        constructor(
            @inject(Weapon) private readonly katana: Weapon,
            @inject(ThrowableWeapon) private readonly shuriken: ThrowableWeapon,
        ) {}

        fight(): string {
            return this.katana.hit();
        }
        sneak(): string {
            return this.shuriken.throw();
        }
    }

    const myContainer = new Container();
    myContainer.bind<Warrior>(Warrior).to(Ninja);
    myContainer.bind<Weapon>(Weapon).to(Katana);
    myContainer.bind<ThrowableWeapon>(ThrowableWeapon).to(Shuriken);

    it("should work", () => {
        const ninja = myContainer.get<Warrior>(Warrior);

        expect(ninja.fight()).toBe("cut!"); // true
        expect(ninja.sneak()).toBe("hit!"); // true
    });
});
