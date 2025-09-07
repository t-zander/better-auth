"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { ErrorContext } from "better-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  username: string;
};

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);
  const { push } = useRouter();

  const form = useForm<FormData>({
    resolver: async (formData) => {
      return {
        values: formData,
        errors: {
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
    const { data, error } = await authClient.signUp.email(
      {
        email: credentials.email, // user email address
        password: credentials.password, // user password -> min 8 characters by default
        name: credentials.username, // user display name
        // image, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: () => {
          setErrors({});
          push("/dashboard");
          setLoading(false);
        },
        onError: (ctx) => {
          console.log("ctx", ctx);
          const errorCode = ctx?.error?.code;
          setLoading(false);

          if (errorCode) {
            if (errorCode.includes("PASSWORD")) {
              setErrors((prev) => ({
                ...prev,
                password: ctx.error.message,
              }));
            }
          } else {
            toast(ctx.error.message);
          }
          // display the error message
        },
      }
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-6"
          >
            <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
