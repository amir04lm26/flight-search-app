"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@components/shared/button/button.component";
import { Input } from "@components/shared/input/input.component";
import { useToggle } from "react-use";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthModal() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log({ data });
  };

  return (
    <>
      <Button onClick={toggleIsOpen}>Login / Signup</Button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative animate-fade-in'>
            <Button
              onClick={toggleIsOpen}
              variant='icon'
              className='absolute top-3 right-3'>
              ✕
            </Button>

            <h2 className='text-xl font-semibold text-secondary mb-4 text-center'>
              {mode === "login" ? "Login to Your Account" : "Create an Account"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <Input
                type='email'
                placeholder='Email'
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
              />
              <Input
                type='password'
                placeholder='Password'
                {...register("password", { required: "Password is required" })}
                error={errors.password?.message}
              />
              {mode === "signup" && (
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                />
              )}
              <Button type='submit' fullWidth>
                {mode === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>

            <p className='text-center text-sm mt-4'>
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Button onClick={toggleMode} variant='text'>
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button onClick={toggleMode} variant='text'>
                    Log in
                  </Button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
