import type { EventRecord } from "@/interfaces/event.interface";

export interface EventDataSource {
  getById(eventId: string): Promise<EventRecord | null>;
  getBySlug(slug: string): Promise<EventRecord | null>;
  getPublished(): Promise<EventRecord[]>;
  getFeaturedPublished(limit?: number): Promise<EventRecord[]>;
}
