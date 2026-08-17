import { CLink } from "@/components/link/CLink";
import { CList } from "@/components/list/CList";
import { Column } from "@/components/layout/Column";
import { MediaImage } from "@/components/media/MediaImage";
import { Row } from "@/components/layout/Row";
import type { ContactOptions, OrganizationOptions } from "@/interfaces/options.interface";

export function CompanyInfo({
  organization,
  contact,
}: {
  organization: OrganizationOptions;
  contact: ContactOptions;
}) {
  const verificationAssets = (organization.verificationAssets ?? []).filter(
    (asset) => asset.enabled !== false,
  );

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
              Email:{" "}
              <CLink href={contact.email.href || `mailto:${contact.email.value}`} className="hover:text-blue-600">
                {contact.email.value}
              </CLink>
            </span>
          ),
        }
      : null,
    contact.hotline?.value
      ? {
          key: "hotline",
          content: (
            <span>
              {contact.hotline.label}:{" "}
              <CLink
                href={contact.hotline.href || `tel:${contact.hotline.value.replace(/\s+/g, "")}`}
                className="font-semibold text-gray-900 hover:text-blue-600"
              >
                {contact.hotline.value}
              </CLink>
            </span>
          ),
        }
      : null,
  ].filter(Boolean) as { key: string; content: React.ReactNode }[];

  if (!infoItems.length && !verificationAssets.length) return null;

  return (
    <Row className="flex-col items-stretch gap-5 sm:flex-row sm:items-start">
      {infoItems.length ? (
        <Column grow className="w-full">
          <CList items={infoItems} className="space-y-2 text-sm leading-6 text-gray-600" />
        </Column>
      ) : null}

      {verificationAssets.length ? (
        <Column className="w-full sm:w-auto sm:min-w-40">
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            {verificationAssets.map((asset) => (
              <MediaImage
                key={asset.mediaId}
                mediaId={asset.mediaId}
                alt={asset.label}
                width={160}
                height={60}
                className="h-auto max-h-12 w-auto object-contain"
              />
            ))}
          </div>
        </Column>
      ) : null}
    </Row>
  );
}
