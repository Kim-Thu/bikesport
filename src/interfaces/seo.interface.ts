import type { Metadata } from "next";

export type SeoObjectType = "page" | "post" | "product" | "category" | "archive" | "custom";

export interface SeoRobotsSettings {
  index?: boolean;
  follow?: boolean;
}

export interface SeoOpenGraphSettings {
  title?: string;
  description?: string;
  type?: "website" | "article";
  imageMediaId?: string;
}

export interface SeoTwitterSettings {
  title?: string;
  description?: string;
  imageMediaId?: string;
}

export interface SeoRecord {
  _id: string;
  objectType: SeoObjectType;
  objectId?: string;
  path?: string;
  title?: string;
  titleFormat?: string;
  description?: string;
  canonical?: string;
  robots?: SeoRobotsSettings;
  openGraph?: SeoOpenGraphSettings;
  twitter?: SeoTwitterSettings;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoData {
  seo: SeoRecord[];
}

export interface SeoGlobalSettings {
  titleFormat: string;
  defaultDescription?: string;
  canonicalBaseUrl?: string;
  robots?: SeoRobotsSettings;
  openGraph?: {
    type?: "website" | "article";
    locale?: string;
    defaultImageMediaId?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    defaultImageMediaId?: string;
  };
}

export interface ResolveSeoInput {
  title?: string;
  description?: string;
  objectType?: SeoObjectType;
  objectId?: string;
  path?: string;
}

export type ResolvedSeoMetadata = Metadata;
