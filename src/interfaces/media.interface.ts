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
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaLibrary {
  media: MediaItem[];
}

export interface MediaImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  mediaId?: string | null;
  alt?: string;
  width?: number;
  height?: number;
}
