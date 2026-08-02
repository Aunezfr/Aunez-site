export const metadata = {
  title: "Aunez — Trouve ton profil de parfum",
  description: "Un quiz olfactif pour découvrir ta signature de parfum et des recommandations de parfums de niche.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
