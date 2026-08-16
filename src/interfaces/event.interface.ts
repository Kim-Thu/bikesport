export interface EventRecord {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  featured?: boolean;
  startAt: string;
  endAt?: string;
  location?: string;
  attendees?: number;
  mediaId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventData {
  events: EventRecord[];
}
