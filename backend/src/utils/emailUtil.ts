export function validatorEmail(email: string): boolean {
    const regexEmail = new RegExp(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    );

    return regexEmail.test(email);
}
