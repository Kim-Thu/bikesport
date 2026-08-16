import type { ImageProps } from "next/image";

export interface MediaItem {
  _id: string;
  name: string;
  fileName: string;
  mimeType: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface MediaLibrary {
  _id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  media: MediaItem[];
}

export interface MediaImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  mediaId: string;
  alt?: string;
  width?: number;
  height?: number;
}
