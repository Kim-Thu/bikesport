import { dataSources } from "@/data-access/data-sources";
import type { EventRecord } from "@/interfaces/event.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

export async function getEventById(eventId: string): Promise<EventRecord | null> {
  return cachedDomain(
    "event",
    ["id", eventId],
    () => dataSources.event.getById(eventId),
    [CACHE_TAG.entity("event", eventId)],
  );
}

export async function getFeaturedEvents(limit?: number): Promise<EventRecord[]> {
  return cachedDomain(
    "event",
    ["featured-published", String(limit ?? "all")],
    () => dataSources.event.getFeaturedPublished(limit),
  );
}
