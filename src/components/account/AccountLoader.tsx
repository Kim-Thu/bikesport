import { Account } from "@/components/account/Account";
import { getSiteOptions } from "@/lib/options.utils";

export async function AccountLoader() {
  const options = await getSiteOptions();
  return <Account account={options.account} />;
}
