import { RedisClient } from "./client";
import { createClient } from "redis";

jest.mock("redis", () => {
  const mClient = {
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
  };
  return {
    createClient: jest.fn(() => mClient),
  };
});

describe("RedisClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - override for test purposes
    RedisClient["client"] = null;
  });

  it("should create a new Redis client if not already created", async () => {
    const client = await RedisClient.new();
    expect(createClient).toHaveBeenCalledTimes(1);
    expect(client.connect).toHaveBeenCalled();
  });

  it("should return the existing Redis client on second call", async () => {
    const client1 = await RedisClient.new();
    const client2 = await RedisClient.new();

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(client1).toBe(client2);
  });
});
