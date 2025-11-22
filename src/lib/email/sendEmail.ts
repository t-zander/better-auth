import "dotenv/config";
import { ComponentProps } from "react";
import { Resend } from "resend";
import { InviteShelterAdminTemplate } from "./templates/InviteShelterAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  subject: string,
  templateName: "InviteShelterAdmin",
  templateProps: ComponentProps<typeof InviteShelterAdminTemplate>,
  { to }: { to: string[] }
) {
  const getTemplateByName = (name: string) => {
    switch (name) {
      case "InviteShelterAdmin":
        return InviteShelterAdminTemplate;
      default:
        throw new Error("Unknown template name");
    }
  };

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      react: getTemplateByName(templateName)(
        templateProps as ComponentProps<ReturnType<typeof getTemplateByName>>
      ),
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
