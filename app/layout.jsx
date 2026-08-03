import { Analytics } from "@vercel/analytics/next";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://aunez.fr"),
  title: "Aunez — Trouve ton profil de parfum",
  description:
    "Un quiz olfactif pour découvrir ta signature de parfum et des recommandations de parfums de niche, choisies avec honnêteté.",
  openGraph: {
    title: "Aunez — Trouve ton profil de parfum",
    description:
      "Un quiz olfactif pour découvrir ta signature de parfum et des recommandations de parfums de niche.",
    url: "https://aunez.fr",
    siteName: "Aunez",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
