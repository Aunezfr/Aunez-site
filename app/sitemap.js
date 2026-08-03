export default function sitemap() {
  const base = "https://aunez.fr";
  const routes = ["", "/a-propos", "/histoire", "/mentions-legales", "/confidentialite"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
