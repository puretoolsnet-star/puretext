/** Crawlers that must reach HTML for indexing and AdSense verification. */
const CRAWLER_UA_SNIPPETS = [
  "googlebot",
  "adsbot-google",
  "mediapartners-google",
  "bingbot",
  "applebot",
  "duckduckbot",
  "google-inspectiontool",
  "storebot-google",
] as const;

const SCRAPER_UA_PATTERNS: RegExp[] = [
  /python-requests/i,
  /\baiohttp\b/i,
  /scrapy/i,
  /go-http-client/i,
  /\bwget\b/i,
  /\bcurl\//i,
  /\bhttpie\b/i,
  /\bokhttp\b/i,
  /libwww-perl/i,
  /\bjava\/[\d.]+/i,
  /\bnode-fetch\b/i,
  /\baxios\/[\d.]+/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
];

const MIN_UA_LENGTH = 12;

export function isAlwaysAllowedPath(pathname: string): boolean {
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/ads.txt") return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) return true;
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true;
  return false;
}

export function isAllowedCrawlerUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_UA_SNIPPETS.some((snippet) => ua.includes(snippet));
}

export function isBlockedScraperUserAgent(userAgent: string | null): boolean {
  if (!userAgent?.trim()) return true;
  const ua = userAgent.trim();
  if (ua.length < MIN_UA_LENGTH) return true;
  if (SCRAPER_UA_PATTERNS.some((re) => re.test(ua))) return true;
  return false;
}

export function shouldBlockBotRequest(userAgent: string | null): boolean {
  if (isAllowedCrawlerUserAgent(userAgent)) return false;
  return isBlockedScraperUserAgent(userAgent);
}