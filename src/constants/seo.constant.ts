export const OPEN_GRAPH_TYPES = [
  "website",
  "article",
  "book",
  "profile",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
] as const;

export const TWITTER_CARD_TYPES = [
  "summary",
  "summary_large_image",
  "player",
  "app",
] as const;

export type OpenGraphType = (typeof OPEN_GRAPH_TYPES)[number];
export type TwitterCardType = (typeof TWITTER_CARD_TYPES)[number];
