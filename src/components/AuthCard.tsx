import { Separator } from "@/components/ui/separator";

type AuthCardProps = {
  title: string;
  emailPasswordAuth: React.ReactNode;
  socialSignOn?: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthCard({
  title,
  emailPasswordAuth,
  socialSignOn,
  footer,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      {emailPasswordAuth}
      {socialSignOn && (
        <div className="mt-8 mb-2 relative h-5">
          <Separator />
          <p className="px-4 py-2 text-sm text-gray-600 bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            or
          </p>
        </div>
      )}
      {socialSignOn}
      {footer && <div className="mt-4 text-center">{footer}</div>}
    </div>
  );
}
