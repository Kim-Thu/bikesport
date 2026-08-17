import type { EventRecord } from "@/interfaces/event.interface";

export interface EventDataSource {
  getById(eventId: string): Promise<EventRecord | null>;
  getFeaturedPublished(limit?: number): Promise<EventRecord[]>;
}
