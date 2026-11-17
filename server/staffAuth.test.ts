import { describe, expect, it } from "vitest";
import { hashPassword, isAllowedStaffEmail, verifyPassword } from "./staffAuth";

describe("staffAuth", () => {
  it("allows only the two authorised staff email addresses", () => {
    expect(isAllowedStaffEmail("rayan@nexusfacility.au")).toBe(true);
    expect(isAllowedStaffEmail("VINU@NEXUSFACILITY.AU")).toBe(true);
    expect(isAllowedStaffEmail("someone@example.com")).toBe(false);
  });

  it("hashes passwords and rejects an incorrect password", async () => {
    const hash = await hashPassword("correct horse battery staple");
    expect(await verifyPassword("correct horse battery staple", hash)).toBe(true);
    expect(await verifyPassword("wrong password", hash)).toBe(false);
  });
});
