import { JWT_SECRET } from "@configs/services.config";
import { RedisClient } from "@libs/redis/client";
import { ResponseUtil } from "@utils/http/response";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: JWT_SECRET });

  if (!token?.id || typeof token.id !== "string") {
    return NextResponse.json(ResponseUtil.error("Unauthorized", 401));
  }

  const client = await RedisClient.new();

  const sessionData = await client.get(`session:${token.id}`);
  if (!sessionData) {
    return NextResponse.json(ResponseUtil.error("Session expired", 401));
  }

  const session = JSON.parse(sessionData);

  return NextResponse.json(
    ResponseUtil.success(
      { ...session, id: token.id },
      "Session data retrieved successfully"
    )
  );
}
