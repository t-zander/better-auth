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
import { Role } from "@/lib/auth/permissions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getStartPageRedirectUrl } from "../utils";

type FormValues = {
  email: string;
  password: string;
  username: string;
};

export function EmailPasswordSignupForm({
  email,
  invitationId,
}: Partial<Pick<FormValues, "email">> & { invitationId?: string }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);
  const { push } = useRouter();

  const form = useForm<FormValues>({
    resolver: async (values) => {
      const resolverErrors = {
        ...(errors.root
          ? {
              root: {
                type: "required",
                message: errors.root,
              },
            }
          : {}),
        ...(errors.password
          ? {
              password: {
                type: "required",
                message: errors.password,
              },
            }
          : {}),
      };

      return {
        errors: resolverErrors,
        values: Object.keys(resolverErrors).length > 0 ? {} : values,
      };
    },
    values: {
      email: email ?? "",
      password: "",
      username: "",
    },
    reValidateMode: "onChange",
  });

  function handleSignUpError(error: {
    code?: string | undefined;
    message?: string | undefined;
    status: number;
    statusText: string;
  }) {
    const errorCode = error?.code;

    if (!errorCode) {
      toast(error.message);
      return;
    }
    if (
      errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_LONG ||
      errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_SHORT
    ) {
      setErrors((prev) => ({
        ...prev,
        password:
          error?.message ?? "Password does not meet length requirements.",
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
  }

  async function onSubmit(credentials: FormValues) {
    setLoading(true);

    setErrors({});

    const { data, error } = await authClient.signUp.email({
      name: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });

    setLoading(false);

    if (error) {
      handleSignUpError(error);
      return;
    }
    console.log("data", data);

    if (!data) {
      return;
    }

    // User is coming from invitation, accept the invitation after sign up
    if (invitationId) {
      const { data, error } = await authClient.organization.acceptInvitation({
        invitationId,
      });

      if (data) {
        push(getStartPageRedirectUrl(data.member.role as Role | undefined));
      }

      if (error) {
        toast.error("Failed to accept invitation: " + error.message);
        return;
      }
    }

    // User is not coming from invitation just proceed with normal sign up flow
    const session = await authClient.getSession();
    setLoading(false);
    push(getStartPageRedirectUrl(session.data?.user?.role as Role | undefined));
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
