"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@components/shared/button/button.component";
import { Input } from "@components/shared/input/input.component";
import { useClickAway, useToggle } from "react-use";
import { handleLogin, handleSignup, IFormData } from "@utils/auth/auth.util";

export default function AuthModal() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>();

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
    reset();
    setError(null);
  };

  const closeModal = () => {
    toggleIsOpen();
    reset();
    setError(null);
    setIsSubmitting(false);
  };

  useClickAway(modalRef, closeModal);

  const onSubmit = async (data: IFormData) => {
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await handleLogin(data);
        closeModal();
      } else {
        await handleSignup(data);
        toggleMode();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={toggleIsOpen}>Login / Signup</Button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            ref={modalRef}
            className='bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md p-6 shadow-lg relative animate-fade-in'>
            <Button
              onClick={closeModal}
              variant='icon'
              className='absolute top-3 right-3 text-gray-500 dark:text-gray-300'>
              ✕
            </Button>

            <h2 className='text-xl font-semibold text-secondary dark:text-primary-light mb-4 text-center'>
              {mode === "login" ? "Login to Your Account" : "Create an Account"}
            </h2>

            {error && (
              <div className='mb-4 text-red-500 text-sm text-center'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {mode === "signup" && (
                <Input
                  type='text'
                  placeholder='Full Name'
                  {...register("name", { required: "Name is required" })}
                  error={errors.name?.message}
                />
              )}
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
              <Button type='submit' fullWidth loading={isSubmitting}>
                {mode === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>

            <p className='text-center text-sm mt-4 text-gray-600 dark:text-gray-400'>
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
