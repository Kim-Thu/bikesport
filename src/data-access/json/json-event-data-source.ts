import eventData from "@/data/wp-event.json";
import type { EventDataSource } from "@/data-access/contracts/event-data-source.interface";
import type { EventData, EventRecord } from "@/interfaces/event.interface";

const events = (eventData as EventData).events;
const eventById = new Map(events.map((event) => [event._id, event]));
const featuredEvents = events
  .filter((event) => event.status === "published" && event.featured)
  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

export const jsonEventDataSource: EventDataSource = {
  async getById(eventId) {
    return eventById.get(eventId) ?? null;
  },
  async getFeaturedPublished(limit) {
    return typeof limit === "number" ? featuredEvents.slice(0, limit) : featuredEvents;
  },
};
