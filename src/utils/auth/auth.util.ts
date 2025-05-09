import { signIn } from "next-auth/react";

export interface IFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const handleLogin = async (data: IFormData): Promise<boolean> => {
  const res = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (res?.error) throw new Error("Invalid email or password.");

  return true;
};

export const handleSignup = async (data: IFormData): Promise<boolean> => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw Error("Some fields are missing");
  }

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const res = await response.json();

  if (res.error)
    throw new Error(res.message ?? "An error occurred during signup.");

  return true;
};
