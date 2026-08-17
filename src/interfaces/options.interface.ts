import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";
import type { SeoGlobalSettings } from "@/interfaces/seo.interface";

export interface SiteThemeOptions {
  themeColor: string;
  backgroundColor: string;
}

export interface SiteIconOptions {
  faviconMediaId?: string;
  favicon32MediaId?: string;
  appleTouchIconMediaId?: string;
  pwa192MediaId?: string;
  pwa512MediaId?: string;
}

export interface SiteIdentityOptions {
  siteTitle: string;
  tagLine?: string;
  logoMediaId?: string;
  showSiteTitle?: boolean;
  showTagLine?: boolean;
  theme: SiteThemeOptions;
  icons: SiteIconOptions;
}

export interface ContactLinkOptions {
  label: string;
  value: string;
  href?: string;
}

export interface SocialLinkOptions {
  name: string;
  label: string;
  iconMediaId?: string;
  href: string;
}

export interface ContactOptions {
  email: ContactLinkOptions;
  hotline: ContactLinkOptions;
  social: SocialLinkOptions[];
}

export interface NavigationOption {
  label: string;
  href: string;
}

export interface VerificationAssetOption {
  label: string;
  mediaId: string;
  enabled?: boolean;
}

export interface OrganizationOptions {
  legalName: string;
  businessRegistration?: {
    number?: string;
    issuedBy?: string;
    issuedDate?: string;
  };
  headquarters?: string;
  verificationAssets?: VerificationAssetOption[];
}

export interface SiteOptionsRecord {
  _id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  site: SiteIdentityOptions;
  seo: SeoGlobalSettings;
  organization: OrganizationOptions;
  contact: ContactOptions;
  account: NavigationOption;
  cart: NavigationOption;
  header: HeaderSettings;
  footer: FooterSettings;
}
