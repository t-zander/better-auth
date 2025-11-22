interface InviteShelterAdminTemplateProps {
  inviteLink: string;
  inviterName: string;
  organizationName: string;
  formattedRole: string;
}

export function InviteShelterAdminTemplate({
  inviteLink,
  organizationName,
  formattedRole,
  inviterName,
}: InviteShelterAdminTemplateProps) {
  return (
    <div>
      <h1>Welcome!</h1>

      <p>
        {inviterName} invited you to join {organizationName} as {formattedRole}
      </p>

      <p>
        You can join the organization by clicking the following link:{" "}
        <a href={inviteLink}>{inviteLink}</a>
      </p>

      <p>
        Already have an account? Don&apos;t worry! Just follow the link. After
        sign in you will be able to manage the shelter.
      </p>
      <p>
        Don&apos;t have an account? Don&apos;t worry! Just follow the link.
        After sign up, you will be able to manage the shelter.
      </p>

      <p>We look forward to having you on board!</p>

      <p>Best regards,</p>

      <p>The {organizationName} team</p>
    </div>
  );
}
