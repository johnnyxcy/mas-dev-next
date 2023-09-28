/*
 * File: @mas/base/tests/common/di.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/28/2023 11:31 am
 *
 * Last Modified: 09/28/2023 02:53 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { beforeAll, describe, expect, it } from "vitest";

import di from "@mas/base/common/di";

describe("https://github.com/inversify/inversify-basic-example/tree/master", () => {
    /**
     * interfaces
     */
    interface Weapon {
        name: string;
    }
    interface Warrior {
        name: string;
        weapon: Weapon;
    }
    interface Battle {
        fight(): string;
    }

    /**
     * constants
     */
    const TAG = {
        CHINESE: "CHINESE",
        JAPANESE: "JAPANESE",
    };

    const SERVICE_IDENTIFIER = {
        BATTLE: Symbol.for("Battle"),
        WARRIOR: Symbol.for("Warrior"),
        WEAPON: Symbol.for("Weapon"),
    };

    /**
     * entities
     */
    @di.injectable()
    class Katana implements Weapon {
        name: string;
        constructor() {
            this.name = "Katana";
        }
    }

    @di.injectable()
    class Shuriken implements Weapon {
        name: string;
        constructor() {
            this.name = "Shuriken";
        }
    }

    @di.injectable()
    class Ninja implements Warrior {
        name: string;
        weapon: Weapon;
        constructor(@di.inject(SERVICE_IDENTIFIER.WEAPON) weapon: Weapon) {
            this.name = "Ninja";
            this.weapon = weapon;
        }
    }

    @di.injectable()
    class Samurai implements Warrior {
        name: string;
        weapon: Weapon;
        constructor(@di.inject(SERVICE_IDENTIFIER.WEAPON) weapon: Weapon) {
            this.name = "Samurai";
            this.weapon = weapon;
        }
    }

    @di.injectable()
    class EpicBattle implements Battle {
        constructor(
            @di.inject(SERVICE_IDENTIFIER.WARRIOR) @di.named(TAG.CHINESE) readonly warrior1: Warrior,
            @di.inject(SERVICE_IDENTIFIER.WARRIOR) @di.named(TAG.JAPANESE) readonly warrior2: Warrior,
        ) {}

        fight() {
            const desc = `FIGHT!
        ${this.warrior1.name} (${this.warrior1.weapon.name})
        vs
        ${this.warrior2.name} (${this.warrior2.weapon.name})`;
            return desc;
        }
    }

    const container = new di.Container();

    beforeAll(() => {
        container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Ninja).whenTargetNamed(TAG.CHINESE);
        container.bind<Warrior>(SERVICE_IDENTIFIER.WARRIOR).to(Samurai).whenTargetNamed(TAG.JAPANESE);
        container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Shuriken).whenParentNamed(TAG.CHINESE);
        container.bind<Weapon>(SERVICE_IDENTIFIER.WEAPON).to(Katana).whenParentNamed(TAG.JAPANESE);
        container.bind<Battle>(SERVICE_IDENTIFIER.BATTLE).to(EpicBattle);
    });

    it("getAll", () => {
        const weapons = container.getAll<Weapon>(SERVICE_IDENTIFIER.WEAPON);
        expect(weapons.length).toBe(2);

        const chineseWarriors = container.getAllNamed<Warrior>(SERVICE_IDENTIFIER.WARRIOR, TAG.CHINESE);
        expect(chineseWarriors.length).toBe(1);

        const japaneseWarriors = container.getAllNamed<Warrior>(SERVICE_IDENTIFIER.WARRIOR, TAG.JAPANESE);
        expect(japaneseWarriors.length).toBe(1);

        const battles = container.getAll<Battle>(SERVICE_IDENTIFIER.BATTLE);
        expect(battles.length).toBe(1);
    });

    it("getNamed", () => {
        const ninja = container.getNamed<Warrior>(SERVICE_IDENTIFIER.WARRIOR, TAG.CHINESE);
        expect(ninja.name).toBe("Ninja");

        const samurai = container.getNamed<Warrior>(SERVICE_IDENTIFIER.WARRIOR, TAG.JAPANESE);
        expect(samurai.name).toBe("Samurai");
    });
});

describe("https://github.com/inversify/InversifyJS/blob/master/wiki", () => {
    it("Container.merge", () => {
        // Creates a new Container containing the bindings ( cloned bindings ) of two or more containers
        @di.injectable()
        class Ninja {
            name = "Ninja";
        }

        @di.injectable()
        class Shuriken {
            name = "Shuriken";
        }

        const CHINA_EXPANSION_TYPES = {
            Ninja: "Ninja",
            Shuriken: "Shuriken",
        };

        @di.injectable()
        class Samurai {
            name = "Samurai";
        }

        @di.injectable()
        class Katana {
            name = "Katana";
        }

        const JAPAN_EXPANSION_TYPES = {
            Katana: "Katana",
            Samurai: "Samurai",
        };

        const chinaExpansionContainer = new di.Container();
        chinaExpansionContainer.bind<Ninja>(CHINA_EXPANSION_TYPES.Ninja).to(Ninja);
        chinaExpansionContainer.bind<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).to(Shuriken);

        const japanExpansionContainer = new di.Container();
        japanExpansionContainer.bind<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).to(Samurai);
        japanExpansionContainer.bind<Katana>(JAPAN_EXPANSION_TYPES.Katana).to(Katana);
        const gameContainer = di.Container.merge(chinaExpansionContainer, japanExpansionContainer);

        expect(gameContainer.get<Ninja>(CHINA_EXPANSION_TYPES.Ninja).name).to.eql("Ninja");
        expect(gameContainer.get<Shuriken>(CHINA_EXPANSION_TYPES.Shuriken).name).to.eql("Shuriken");
        expect(gameContainer.get<Samurai>(JAPAN_EXPANSION_TYPES.Samurai).name).to.eql("Samurai");
        expect(gameContainer.get<Katana>(JAPAN_EXPANSION_TYPES.Katana).name).to.eql("Katana");
    });

    it("container.getAsync", async () => {
        const ILevel = Symbol.for("ILevel");
        interface ILevel {
            // maybe something
            rankUp(): void;
            currentLevel: number;
        }

        @di.injectable()
        class Level implements ILevel {
            currentLevel = 0;

            rankUp(): void {
                this.currentLevel++;
            }
        }

        async function buildLevel(): Promise<ILevel> {
            return new Level();
        }

        const container = new di.Container();
        container.bind(ILevel).toDynamicValue(() => buildLevel());

        const level = await container.getAsync<ILevel>(ILevel); // Returns Promise<Level1>
        expect(level.currentLevel).toBe(0);

        level.rankUp();
        expect(level.currentLevel).toBe(1);
    });

    it("container.getAllNamed", () => {
        const container = new di.Container();

        interface Intl {
            hello?: string;
            goodbye?: string;
        }

        container.bind<Intl>("Intl").toConstantValue({ hello: "bonjour" }).whenTargetNamed("fr");
        container.bind<Intl>("Intl").toConstantValue({ goodbye: "au revoir" }).whenTargetNamed("fr");

        container.bind<Intl>("Intl").toConstantValue({ hello: "hola" }).whenTargetNamed("es");
        container.bind<Intl>("Intl").toConstantValue({ goodbye: "adios" }).whenTargetNamed("es");

        const fr = container.getAllNamed<Intl>("Intl", "fr");
        expect(fr.length).to.eql(2);
        expect(fr[0].hello).to.eql("bonjour");
        expect(fr[1].goodbye).to.eql("au revoir");

        const es = container.getAllNamed<Intl>("Intl", "es");
        expect(es.length).to.eql(2);
        expect(es[0].hello).to.eql("hola");
        expect(es[1].goodbye).to.eql("adios");
    });

    it("container.getAllNamedAsync", async () => {
        const container = new di.Container();

        interface Intl {
            hello?: string;
            goodbye?: string;
        }

        container.bind<Intl>("Intl").toConstantValue({ hello: "bonjour" }).whenTargetTagged("lang", "fr");
        container.bind<Intl>("Intl").toConstantValue({ goodbye: "au revoir" }).whenTargetTagged("lang", "fr");

        container.bind<Intl>("Intl").toConstantValue({ hello: "hola" }).whenTargetTagged("lang", "es");
        container.bind<Intl>("Intl").toConstantValue({ goodbye: "adios" }).whenTargetTagged("lang", "es");

        const fr = container.getAllTagged<Intl>("Intl", "lang", "fr");
        expect(fr.length).to.eql(2);
        expect(fr[0].hello).to.eql("bonjour");
        expect(fr[0].goodbye).to.eql(undefined);
        expect(fr[1].goodbye).to.eql("au revoir");
        expect(fr[1].hello).to.eql(undefined);

        const es = container.getAllTagged<Intl>("Intl", "lang", "es");
        expect(es.length).to.eql(2);
        expect(es[0].hello).to.eql("hola");
        expect(es[0].goodbye).to.eql(undefined);
        expect(es[1].goodbye).to.eql("adios");
        expect(es[1].hello).to.eql(undefined);
    });

    it("container.isBound", () => {
        interface IWarrior {
            fight(): void;
        }
        const warriorId = "Warrior";
        const warriorSymbol = Symbol.for("Warrior");

        @di.injectable()
        class Ninja implements IWarrior {
            fight(): void {
                // do nothing
                console.log("Ninja starts fighting");
            }
        }

        interface IKatana {
            hit(): void;
        }
        const katanaId = "IKatana";
        const katanaSymbol = Symbol.for("IKatana");

        @di.injectable()
        class Katana implements IKatana {
            hit(): void {
                // do nothing
                console.log("hit");
            }
        }

        const container = new di.Container();
        container.bind<IWarrior>(Ninja).to(Ninja);
        container.bind<IWarrior>(warriorId).to(Ninja);
        container.bind<IWarrior>(warriorSymbol).to(Ninja);

        expect(container.isBound(Ninja)).to.eql(true);
        expect(container.isBound(warriorId)).to.eql(true);
        expect(container.isBound(warriorSymbol)).to.eql(true);
        expect(container.isBound(Katana)).to.eql(false);
        expect(container.isBound(katanaId)).to.eql(false);
        expect(container.isBound(katanaSymbol)).to.eql(false);
    });

    it("container.rebind", () => {
        const TYPES = {
            someType: "someType",
        };

        const container = new di.Container();
        container.bind<number>(TYPES.someType).toConstantValue(1);
        container.bind<number>(TYPES.someType).toConstantValue(2);

        const values1 = container.getAll(TYPES.someType);
        expect(values1[0]).to.eq(1);
        expect(values1[1]).to.eq(2);

        container.rebind<number>(TYPES.someType).toConstantValue(3);
        const values2 = container.getAll(TYPES.someType);
        expect(values2[0]).to.eq(3);
        expect(values2[1]).to.eq(undefined);
    });

    it("container.resolve", () => {
        @di.injectable()
        class Katana {
            hit() {
                return "cut!";
            }
        }

        interface IWarrior {
            fight(): void;
        }

        @di.injectable()
        class Ninja implements IWarrior {
            constructor(@di.inject(Katana) readonly katana: Katana) {}

            fight() {
                return this.katana.hit();
            }
        }

        const container = new di.Container();
        container.bind(Katana).toSelf();

        const tryGet = () => container.get(Ninja);
        expect(tryGet).to.throw("No matching bindings found for serviceIdentifier: Ninja");

        const ninja = container.resolve(Ninja);
        expect(ninja.fight()).to.eql("cut!");
    });
});
