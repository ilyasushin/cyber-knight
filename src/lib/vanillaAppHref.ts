/** URL статического приложения с мини-играми (копируется в public/vanilla при dev/build). */
export function getVanillaAppHref(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? `${base}vanilla/index.html` : `${base}/vanilla/index.html`;
}
