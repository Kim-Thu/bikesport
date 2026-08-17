import { Contact, type ContactProps } from "@/components/contact/Contact";
import { getSiteOptions } from "@/lib/options.utils";

type ContactLoaderProps = Omit<ContactProps, "hotline">;

export async function ContactLoader(props: ContactLoaderProps) {
  const options = await getSiteOptions();
  return <Contact {...props} hotline={options.contact.hotline} />;
}
