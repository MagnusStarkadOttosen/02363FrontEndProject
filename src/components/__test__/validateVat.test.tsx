import { describe, expect, it } from "vitest";
import { validateVAT } from "../../context/validation"; 

describe("validateVAT", () => {
    it("Test for valid VAT with country codes", () => {
        expect(validateVAT("DK12345678").valid).toBe(true);
        expect(validateVAT("DE87654321").valid).toBe(true);
    });

    it("Test for valid VAT without country code", () => {
        expect(validateVAT("12345678").valid).toBe(true);
    });

    it("Test for invalid VAT", () => {
        expect(validateVAT("DK1234567").valid).toBe(false);
        expect(validateVAT("1234567").valid).toBe(false);
        expect(validateVAT("ABCDE12345678").valid).toBe(false);
        expect(validateVAT("DK123456789").valid).toBe(false);
    });
});