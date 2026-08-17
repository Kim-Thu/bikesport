import { dataSources } from "@/data-access/data-sources";
import type { EventRecord } from "@/interfaces/event.interface";

export async function getEventById(eventId: string): Promise<EventRecord | null> {
  return dataSources.event.getById(eventId);
}

export async function getFeaturedEvents(limit?: number): Promise<EventRecord[]> {
  return dataSources.event.getFeatured(limit);
}
