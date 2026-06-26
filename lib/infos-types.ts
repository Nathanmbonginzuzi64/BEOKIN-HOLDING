export type InfoPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  location: string;
  eventDate: string;
  image?: string;
  publishedAt: string;
};

export type PublishInfoInput = {
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  location: string;
  eventDate: string;
  image?: string;
};

export function normalizeInfoPost(info: Partial<InfoPost>): InfoPost {
  return {
    id: info.id ?? crypto.randomUUID(),
    title: info.title ?? "",
    summary: info.summary ?? "",
    content: info.content ?? "",
    category: info.category ?? "",
    author: info.author ?? "",
    location: info.location ?? "",
    eventDate: info.eventDate ?? "",
    image: info.image,
    publishedAt: info.publishedAt ?? new Date().toISOString(),
  };
}

export function sortInfos(infos: InfoPost[]): InfoPost[] {
  return [...infos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
