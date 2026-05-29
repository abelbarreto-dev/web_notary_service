import { describe, expect, test } from "@jest/globals";
import { uuidMocked } from "@test/mocks/uuid.mocked";
import { NotaryException } from "@exception/notary.exception";
import {
    validateNotaryCreateOrUpdate,
    validateNotaryId,
} from "../../../src/utils/validators/notary.validator";
import { NotaryId } from "@infra/notary.models";
import { makeNotaryMocked } from "@test/mocks/notary.mocked";
import { NotaryStatus, NotaryType } from "@infra/enums";
import {
    generateCPF,
    generateInvalidCPF,
} from "../../../src/utils/general/cpf.util";
import { makeUserMocked } from "@test/mocks/user.mocked";
import { validateUserCreateOrUpdate } from "../../../src/utils/validators/user.validator";

describe("Notary validator --> validateNotaryId", () => {
    test("user id success", async () => {
        const notaryId: NotaryId = { id: uuidMocked() };

        await expect(validateNotaryId(notaryId)).resolves.not.toThrow(
            NotaryException,
        );
    });

    test("user id success", async () => {
        const notaryId: NotaryId = { id: uuidMocked() + "Brazil" };

        await expect(validateNotaryId(notaryId)).rejects.toThrow(
            "invalid notary id format",
        );
    });
});

describe("Notary validator --> validateNotaryCreateOrUpdate", () => {
    test("notary applicant success validation", async () => {
        const notary = makeNotaryMocked({ applicant: "Cristino Ronaldo" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary applicant success validation length == 2", async () => {
        const notary = makeNotaryMocked({ applicant: "Ed" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary applicant success validation length == 254", async () => {
        const notary = makeNotaryMocked({ applicant: "Ed".repeat(127) });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary applicant success validation length < 2", async () => {
        const notary = makeNotaryMocked({ applicant: "E" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary applicant format");
    });

    test("notary applicant success validation length > 254", async () => {
        const notary = makeNotaryMocked({ applicant: "Ed".repeat(127) + "P" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary applicant format");
    });

    test("notary applicant success validation length < 2", async () => {
        const notary = makeNotaryMocked({});
        notary.applicant += "74";

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary applicant format");
    });

    test("notary cpf success validation", async () => {
        const notary = makeNotaryMocked({ cpf: generateCPF() });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary cpf failure validation successfully", async () => {
        const notary = makeNotaryMocked({ cpf: "123456789B3" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary cpf format");
    });

    test("notary cpf failure validation checkers digits", async () => {
        const notary = makeNotaryMocked({ cpf: generateInvalidCPF() });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary cpf checkers digits");
    });

    test("notary description validation failure length < 4 successfully", async () => {
        const notary = makeNotaryMocked({ description: "ana" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary description format");
    });

    test("notary description validation failure length > 254 successfully", async () => {
        const notary = makeNotaryMocked({
            description: "aE".repeat(125) + "NaNaN",
        });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary description format");
    });

    test("notary description validation failure min length == 4 successfully", async () => {
        const notary = makeNotaryMocked({ description: "Abel" });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary description validation failure max length == 254 successfully", async () => {
        const notary = makeNotaryMocked({
            description: "Ed".repeat(127),
        });

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary remarks failed limit min length < 4 successfully", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: "Ana",
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary remarks format");
    });

    test("notary remarks failed limit max length > 511 successfully", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: "An".repeat(256),
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary remarks format");
    });

    test("notary remarks success length == 4 successfully", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: "Paul",
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary remarks success length == 511 successfully", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: "An".repeat(255) + "O",
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: NotaryType[notary.notaryType],
            }),
        ).resolves.not.toThrow(NotaryException);
    });

    test("notary validate undefined notary status", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: undefined,
                notaryType: NotaryType[notary.notaryType],
            }),
        ).rejects.toThrow("invalid notary status value");
    });

    test("notary validate undefined notary type", async () => {
        const notary = makeNotaryMocked({});

        await expect(
            validateNotaryCreateOrUpdate({
                ...notary,
                remarks: undefined,
                notaryStatus: NotaryStatus[notary.notaryStatus],
                notaryType: undefined,
            }),
        ).rejects.toThrow("invalid notary type value");
    });
});
