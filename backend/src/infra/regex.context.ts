export const regex = {
    name: (name: string, max: number, min?: number) =>
        RegExp(
            `^(?=[^ -]{${min ? min : ""}, ${max} }$)[A-Za-zÀ-ÖØ-öø-ÿ]+([ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$`,
        ).test(name),
    email: (email: string) =>
        RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).test(email),
    password: (password: string, max: number, min: number) =>
        RegExp(
            `^[0-9A-\\\\Za\\/-z+*&{}?%$ç@!"')(\\[\\].=£§áéíóúâêô~^àã#_-]{${min},${max}}$`,
        ).test(password),
    cpf: (cpf: string) => RegExp(/^[0-9]{11}$/).test(cpf),
    text: (text: string, max: number, min?: number) =>
        RegExp(`^[.+]{${min ? min : ""}, ${max}}`).test(text),
    uuid: (uuid: string) =>
        RegExp(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        ).test(uuid),
};
