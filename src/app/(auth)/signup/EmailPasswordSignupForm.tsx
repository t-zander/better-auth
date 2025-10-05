"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getSignUpRedirectUrl } from "../utils";

type FormData = {
  email: string;
  password: string;
  username: string;
};

export function EmailPasswordSignupForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);
  const { push } = useRouter();

  const form = useForm<FormData>({
    resolver: async (formData) => {
      return {
        values: formData,
        errors: {
          ...(errors.root
            ? {
                root: {
                  message: errors.root,
                },
              }
            : {}),
          ...(errors.password
            ? {
                password: {
                  message: errors.password,
                },
              }
            : {}),
        },
      };
    },
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(credentials: FormData) {
    await authClient.signUp.email(
      {
        email: credentials.email,
        password: credentials.password,
        name: credentials.username,
        callbackURL: getSignUpRedirectUrl(),
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setErrors({});
          /* 
            when user signs up with email and password,
            redirect them to select your role screen
          */
          push("/dashboard");
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);

          const errorCode = ctx?.error?.code;
          if (!errorCode) {
            toast(ctx.error.message);
            return;
          }

          if (
            errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_LONG ||
            errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_SHORT
          ) {
            setErrors((prev) => ({
              ...prev,
              password: ctx.error.message,
            }));
            return;
          }

          if (errorCode === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            setErrors((prev) => ({
              ...prev,
              root: "User with this email already exists.",
            }));
            return;
          }
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errors.root && (
          <Alert variant="destructive">
            <AlertTitle>Unable to sign up</AlertTitle>
            <AlertDescription>{errors.root}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
