import { CelebrantGalleryExperience } from "@/components/invitation/CelebrantGalleryExperience";
import { invitation } from "@/config/invitation";

export default function Home() {
  return <CelebrantGalleryExperience invitation={invitation} />;
}
