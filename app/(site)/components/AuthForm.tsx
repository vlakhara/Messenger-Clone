"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { VARIANT } from "../types/auth-page-types";
import AuthSocialButton from "./AuthSocialButton";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<VARIANT>("REGISTER");
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
    }
  }, [session?.status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("You are logged in");
          }
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        console.log({ callback });
        if (callback?.ok && !callback?.error) {
          toast.success("You are logged in");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleVariant = () => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button type="submit" fullwidth disabled={isLoading}>
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 text-sm mt-5 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an Account?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
