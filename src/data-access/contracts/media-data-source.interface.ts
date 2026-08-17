import type { MediaItem } from "@/interfaces/media.interface";

export interface MediaDataSource {
  getById(mediaId: string): Promise<MediaItem | null>;
  getByIds(mediaIds: string[]): Promise<MediaItem[]>;
}
