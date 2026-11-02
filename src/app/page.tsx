import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { invitation } from "@/config/invitation";

export default function Home() {
  return <InvitationExperience invitation={invitation} />;
}
