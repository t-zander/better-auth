import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function GoogleSignOnFailed({
  error,
  mode,
}: {
  error: string;
  mode: "signup" | "signin";
}) {
  return (
    <Alert variant="destructive">
      <AlertTitle>
        Unable to {mode === "signup" ? "sign up" : "sign in"} with Google
      </AlertTitle>
      <AlertDescription>
        {error === "access_denied" ? (
          <p>
            It seems you cancelled the{" "}
            {mode === "signup" ? "sign up" : "sign in"} process. If this was a
            mistake, please try{" "}
            {mode === "signup" ? "signing up" : "signing in"} with Google again.
          </p>
        ) : (
          <p>
            We are unable to {mode === "signup" ? "sign you up" : "sign you in"}{" "}
            with Google. Please try again.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}
