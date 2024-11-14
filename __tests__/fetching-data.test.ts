import { Klyra } from "@klyra/core";
import { addys } from "utils/address-data";
import { beforeAll, describe, it, expect } from "@jest/globals";

describe("Klyra Core Tests", () => {
  let klyra: Klyra;

  // This runs once before all tests
  beforeAll(async () => {
    klyra = await initKlyra();
  });

  async function initKlyra(): Promise<Klyra> {
    const klyra = new Klyra({
      environment: "testnet",
      fees: {
        feePpm: 1000,
        address: addys.emily,
        subaccountNumber: 0,
      },
    });

    await klyra.initialize();
    return klyra;
  }

  // Your test cases go here
  it("should initialize successfully", () => {
    expect(klyra).toBeDefined();
  });

  // Add more test cases as needed
  it("example test", async () => {
    // Use the initialized klyra instance here
    // const result = await klyra.someMethod();
    // expect(result).toBe(expectedValue);
  });
});
