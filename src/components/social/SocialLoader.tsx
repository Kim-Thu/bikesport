import { Social } from "@/components/social/Social";
import { getSiteOptions } from "@/lib/options.utils";

export async function SocialLoader() {
  const options = await getSiteOptions();
  return <Social items={options.contact.social ?? []} />;
}
