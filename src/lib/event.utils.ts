import eventData from "@/data/wp-event.json";
import type { EventData, EventRecord } from "@/interfaces/event.interface";

const data = eventData as EventData;
const featuredEvents = data.events
  .filter((event) => event.status === "published" && event.featured)
  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

export function getFeaturedEvents(limit?: number): EventRecord[] {
  return typeof limit === "number" ? featuredEvents.slice(0, limit) : featuredEvents;
}
