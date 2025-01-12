export interface Url {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  expiresAt?: string;
  clickCount: number;
  clicks: { date: string; ip: string }[];
}
