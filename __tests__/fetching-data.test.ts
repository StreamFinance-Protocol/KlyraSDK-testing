import { Klyra, IndexerPerpetualMarket } from "@klyra/core";
import { addys } from "../utils/address-data";
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

  it("should initialize successfully", () => {
    expect(klyra).toBeDefined();
    const chainClient = klyra.getChainClient();
    expect(chainClient.isInitialized).toBeTruthy;
  });

  it("should get all markets", async () => {
    const markets = await klyra.getAllMarkets();
    expect(markets).toBeDefined();
    const btcMarket = markets["BTC-USD"];
    expect(typeof markets).toBe("object");
    console.log("----GetAllMarkets Test: markets----");
    console.log(markets);
  });

  it("should get single market info", async () => {
    const btcMarket = await klyra.getMarketInfo("BTC-USD");
    expect(btcMarket).toBeDefined();
    expect(typeof btcMarket).toBe("object");
    console.log("----GetMarketInfo Test: btc market----");
    console.log(btcMarket);
  });

  it("should get market candles for single market", async () => {
    const btcCandles = await klyra.getMarketCandles("BTC-USD", "1DAY");
    expect(btcCandles).toBeDefined();
    expect(typeof btcCandles).toBe("object");
    console.log("----GetMarketCandles Test: btc candles----");
    console.log(btcCandles);
  });

  it("should get orderbook for single market", async () => {
    const btcOrderbook = await klyra.getOrderbook("BTC-USD");
    expect(btcOrderbook).toBeDefined();
    expect(typeof btcOrderbook).toBe("object");
    expect(btcOrderbook).toHaveProperty("bids");
    expect(btcOrderbook).toHaveProperty("asks");
    expect(Array.isArray(btcOrderbook.bids)).toBe(true);
    expect(Array.isArray(btcOrderbook.asks)).toBe(true);
    console.log("----GetOrderbook Test: btc orderbook----");
    console.log(btcOrderbook);
  });

  it("should get trades for a single market", async () => {
    const btcTrades = await klyra.getMarketTrades("BTC-USD");
    expect(btcTrades).toBeDefined();
    expect(typeof btcTrades).toBe("object");
    console.log("----GetMarketTrades Test: btc trades----");
    console.log(btcTrades);
  });

  it("should get historical funding rates for a single market", async () => {
    const fundingRates = await klyra.getHistoricalFundingRates("BTC-USD");
    expect(fundingRates).toBeDefined();
    expect(typeof fundingRates).toBe("object");
    console.log("----GetHistoricalFundingRates Test: btc funding rates----");
    console.log(fundingRates);
  });

  it("should get user positions", async () => {
    const positions = await klyra.getUserPositions(addys.faucet, 0);
    expect(positions).toBeDefined();
    expect(typeof positions).toBe("object");
    console.log("----GetUserPositions Test: alice positions----");
    console.log(positions);
  });

  it("should get user orders", async () => {
    const orders = await klyra.getUserOrders(addys.faucet, 0);
    expect(orders).toBeDefined();
    expect(typeof orders).toBe("object");
    console.log("----GetUserOrders Test: alice orders----");
    console.log(orders);
  });

  it("should get user fills", async () => {
    const fills = await klyra.getUserFills(addys.faucet, 0);
    expect(fills).toBeDefined();
    expect(typeof fills).toBe("object");
    expect(fills).toHaveProperty("fills");
    console.log("----GetUserFills Test: alice fills----");
    console.log(fills);
  });

  it("should get user transfers", async () => {
    const transfers = await klyra.getUserTransfers(addys.faucet, 0);
    expect(transfers).toBeDefined();
    expect(typeof transfers).toBe("object");
    console.log("----GetUserTransfers Test: alice transfers----");
    console.log(transfers);
  });

  it("should get user historical PNL", async () => {
    const historicalPNL = await klyra.getUserHistoricalPNLs(addys.faucet, 0);
    expect(historicalPNL).toBeDefined();
    expect(typeof historicalPNL).toBe("object");
    console.log("----GetUserHistoricalPNLs Test: alice PNLs----");
    console.log(historicalPNL);
  });
});
