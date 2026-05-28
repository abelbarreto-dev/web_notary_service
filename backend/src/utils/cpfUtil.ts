import {faker} from "@faker-js/faker";

function calculateDigit(bodyCpf: string): string {
    const length = bodyCpf.length;

    const arrayNumbers = Array.from(bodyCpf).map(x => Number(x));

    let times = length + 1;
    let digit = 0;

    for (let i = 0; i < length; i++) {
        digit += arrayNumbers[i] * times;
        times --;
    }

    const remainder = digit % 11;

    digit = remainder < 2 ? 0 : 11 - remainder;

    return `${bodyCpf}${digit}`;
}

export function validatorCPF(cpf: string): boolean {
    const cpfRegex = new RegExp(/^[0-9]{11}$/);

    if (!cpfRegex.test(cpf)) return false;

    let cpfTest = cpf.slice(0, 9);

    cpfTest = calculateDigit(cpfTest);
    cpfTest = calculateDigit(cpfTest);

    return cpf === cpfTest;
}

export function generateCPF(): string {
    let bodyCpf = faker.string.numeric({ length: 9});

    bodyCpf = calculateDigit(bodyCpf);
    bodyCpf = calculateDigit(bodyCpf);

    return `${bodyCpf}`;
}

export function generateInvalidCPF(): string {
    while (true) {
        const cpf = faker.string.numeric({ length: 11});

        if (!validatorCPF(cpf)) return cpf;
    }
}
