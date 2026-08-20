import eventData from "@/data/wp-event.json";
import type { EventDataSource } from "@/data-access/contracts/event-data-source.interface";
import type { EventData } from "@/interfaces/event.interface";

const events = (eventData as EventData).events;
const eventById = new Map(events.map((event) => [event._id, event]));
const eventBySlug = new Map(events.map((event) => [event.slug, event]));
const publishedEvents = events
  .filter((event) => event.status === "published")
  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
const featuredEvents = publishedEvents.filter((event) => event.featured);

export const jsonEventDataSource: EventDataSource = {
  async getById(eventId) {
    return eventById.get(eventId) ?? null;
  },
  async getBySlug(slug) {
    return eventBySlug.get(slug) ?? null;
  },
  async getPublished() {
    return publishedEvents;
  },
  async getFeaturedPublished(limit) {
    return typeof limit === "number" ? featuredEvents.slice(0, limit) : featuredEvents;
  },
};
