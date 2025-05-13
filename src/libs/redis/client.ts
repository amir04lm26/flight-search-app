import { createClient, RedisClientType } from "redis";
import { REDIS_URL } from "@configs/services.config";

export class RedisClient {
  private static client: RedisClientType | null = null;

  private constructor() {}

  public static async new(): Promise<RedisClientType> {
    if (!this.client) {
      this.client = createClient({
        url: REDIS_URL,
      });

      this.client.on("error", (err) => {
        console.error("[Redis Client Error]", err);
      });

      await this.client.connect().catch((err) => {
        console.error("Error connecting to Redis:", err);
        throw err;
      });
    }

    return this.client;
  }

  public static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
    }
  }
}
