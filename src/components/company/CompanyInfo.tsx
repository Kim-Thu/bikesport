import Image from "next/image";
import { CLink } from "@/components/link/CLink";
import { CList } from "@/components/list/CList";
import { Social } from "@/components/social/Social";
import wpOption from "@/data/wp-option.json";

export function CompanyInfo() {
  const { organization, contact } = wpOption;
  const verificationAssets = (organization.verificationAssets ?? []).filter((asset) => asset.enabled !== false);

  const infoItems = [
    organization.legalName
      ? { key: "legal-name", content: <strong className="font-semibold text-gray-900">{organization.legalName}</strong> }
      : null,
    organization.businessRegistration?.number
      ? {
          key: "business-registration",
          content: (
            <span>
              ĐKKD/MST: {organization.businessRegistration.number}
              {organization.businessRegistration.issuedBy ? ` do ${organization.businessRegistration.issuedBy}` : ""}
              {organization.businessRegistration.issuedDate ? ` cấp ${organization.businessRegistration.issuedDate}` : ""}
            </span>
          ),
        }
      : null,
    organization.headquarters
      ? { key: "headquarters", content: <span>Trụ sở: {organization.headquarters}</span> }
      : null,
    contact.email?.value
      ? {
          key: "email",
          content: (
            <span>
              Email: <CLink href={contact.email.href || `mailto:${contact.email.value}`} className="hover:text-blue-600">{contact.email.value}</CLink>
            </span>
          ),
        }
      : null,
    contact.hotline?.value
      ? {
          key: "hotline",
          content: (
            <span>
              {contact.hotline.label}: <CLink href={contact.hotline.href || `tel:${contact.hotline.value.replace(/\s+/g, "")}`} className="font-semibold text-gray-900 hover:text-blue-600">{contact.hotline.value}</CLink>
            </span>
          ),
        }
      : null,
  ].filter(Boolean) as { key: string; content: React.ReactNode }[];

  return (
    <div className="space-y-4">
      <CList items={infoItems} className="space-y-2 text-sm leading-6 text-gray-600" />
      <Social />

      {verificationAssets.length ? (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {verificationAssets.map((asset) => (
            <Image
              key={asset.src}
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="h-auto max-h-12 w-auto object-contain"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
