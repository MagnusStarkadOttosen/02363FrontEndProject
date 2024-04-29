import { describe, expect, it } from "vitest";
import { validatePhoneNumber } from "../../context/validation"; 

describe("validateZip", () => {
    it("Test for valid numbers", () => {
        expect(validatePhoneNumber("+12345678").valid).toBe(true);
        expect(validatePhoneNumber("12345678").valid).toBe(true);
    });

    it("Test for invalid numbers", () => {
        expect(validatePhoneNumber("+1234567").valid).toBe(false);
        expect(validatePhoneNumber("+123456789").valid).toBe(false);
        expect(validatePhoneNumber("abcdefgh").valid).toBe(false);
    });
});
