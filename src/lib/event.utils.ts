import eventData from "@/data/wp-event.json";
import type { EventData, EventRecord } from "@/interfaces/event.interface";

const data = eventData as EventData;

export function getFeaturedEvents(limit?: number): EventRecord[] {
  const events = data.events
    .filter((event) => event.status === "published" && event.featured)
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return typeof limit === "number" ? events.slice(0, limit) : events;
}
