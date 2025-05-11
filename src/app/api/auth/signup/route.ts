import { users } from "@/db/schema";
import { db } from "@db";
import { ISignupFormData } from "@dto/auth.dto";
import { hashPassword } from "@libs/auth/hash";
import { ResponseUtil } from "@utils/http/response";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json(ResponseUtil.error("Invalid input", 400));
  }

  let user: ISignupFormData;
  try {
    user = await req.json();
  } catch {
    return NextResponse.json(ResponseUtil.error("Malformed JSON", 400));
  }

  const { name, email, password } = user;

  // NOTE: We should implement some validation logic for production purposes
  if (!name || !email || !password) {
    return NextResponse.json(ResponseUtil.error("Missing some fields", 400));
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0]);
  if (existingUser)
    return NextResponse.json(ResponseUtil.error("Email already registered"));

  const hashedPassword = await hashPassword(password);

  await db.insert(users).values({ name, email, password: hashedPassword });

  return NextResponse.json(ResponseUtil.success({ name, email, password }));
}
