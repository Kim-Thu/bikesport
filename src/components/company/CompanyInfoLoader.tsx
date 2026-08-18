import { CompanyInfo } from "@/components/company/CompanyInfo";
import { getSiteOptions } from "@/lib/options.utils";

export async function CompanyInfoLoader() {
  const options = await getSiteOptions();
  return <CompanyInfo organization={options.organization} contact={options.contact} />;
}
