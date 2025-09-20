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

type FormData = {
  email: string;
  password: string;
};

export function EmailPasswordSigninForm() {
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
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(credentials: FormData) {
    await authClient.signIn.email(
      {
        email: credentials.email,
        password: credentials.password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setErrors({});
          push("/dashboard");
          setLoading(false);
        },
        onError: (ctx) => {
          const errorCode = ctx?.error?.code;
          setLoading(false);

          if (errorCode) {
            if (errorCode === "INVALID_EMAIL_OR_PASSWORD") {
              setErrors((prev) => ({
                ...prev,
                root: ctx.error.message,
              }));
            } else if (errorCode.includes("PASSWORD")) {
              setErrors((prev) => ({
                ...prev,
                password: ctx.error.message,
              }));
            } else {
              toast(ctx.error.message);
            }
          } else {
            toast(ctx.error.message);
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
                    autoComplete="current-password"
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
            <AlertTitle>Unable to sign in</AlertTitle>
            <AlertDescription>{errors.root}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
