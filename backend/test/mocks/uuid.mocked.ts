import Chance from "chance";

const chance = new Chance();

export function uuidMocked() {
    return chance.guid({ version: 4 });
}
