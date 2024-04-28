import { describe, expect, it } from "vitest";
import { validateZip } from "../../context/validation"; 

describe("validateZip", () => {
    it("Test for valid ZIP", async () => {
        const result = await validateZip("1111", "DK");
        expect(result.valid).toBe(true);
        expect(result.message).toBe("");
    });

    it("Test for invalid ZIP", async () => {
        const result = await validateZip("2222", "DK");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Invalid ZIP code for Denmark");
    });

});
