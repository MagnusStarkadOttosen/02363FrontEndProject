import { describe, expect, it } from "vitest";
import { validateEmail } from "../../context/validation"; 

describe("validateEmail", () => {
    it("Test for valid emails", () => {
        expect(validateEmail("test@example.com").valid).toBe(true);
        expect(validateEmail("hello.world@domain.co.uk").valid).toBe(true);
    });

    it("Test for invalid emails", () => {
        expect(validateEmail("testexample.com").valid).toBe(false);
        expect(validateEmail("test@examplecom").valid).toBe(false);
        expect(validateEmail("test@.com").valid).toBe(false);
    });
});
