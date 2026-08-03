export const metadata = {
  title: "Confidentialité — Aunez",
};

export default function Confidentialite() {
  return (
    <div style={styles.page}>
      <div style={styles.vignette} />
      <div style={styles.card}>
        <a href="/" style={styles.back}>
          ← Retour au quiz
        </a>
        <div style={styles.eyebrow}>Confidentialité</div>
        <h1 style={styles.h1}>Politique de confidentialité</h1>

        <h2 style={styles.h2}>Données collectées</h2>
        <p style={styles.p}>
          Le quiz olfactif fonctionne entièrement dans votre navigateur :
          vos réponses ne sont pas enregistrées sur nos serveurs. Aunez ne
          collecte actuellement aucune donnée personnelle.
        </p>

        <h2 style={styles.h2}>Cookies</h2>
        <p style={styles.p}>
          Ce site n'utilise pas de cookies de suivi publicitaire. Des
          cookies techniques peuvent être déposés par notre hébergeur
          (Vercel) pour le bon fonctionnement du site.
        </p>

        <h2 style={styles.h2}>Liens affiliés</h2>
        <p style={styles.p}>
          Lorsque vous cliquez sur un lien affilié présent sur le site,
          vous êtes redirigé vers le site du marchand partenaire, qui peut
          appliquer sa propre politique de confidentialité et de suivi.
          Aunez ne collecte aucune information sur ces transactions.
        </p>

        <h2 style={styles.h2}>Vos droits</h2>
        <p style={styles.p}>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification et de suppression des données vous concernant.
          Le site ne collectant actuellement aucune donnée personnelle,
          cette section sera complétée si cela évolue.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#08070c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "'Georgia', 'Iowan Old Style', serif",
    position: "relative",
    overflow: "hidden",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 15%, rgba(201,147,47,0.14), transparent 60%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 560,
    background: "rgba(20,15,26,0.6)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(245,240,230,0.14)",
    borderRadius: 6,
    padding: "40px 36px",
    boxShadow: "0 20px 70px rgba(0,0,0,0.55)",
    color: "#f5f0e6",
  },
  back: {
    display: "inline-block",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    color: "rgba(245,240,230,0.55)",
    textDecoration: "none",
    marginBottom: 26,
  },
  eyebrow: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9932f",
    marginBottom: 14,
  },
  h1: { fontSize: 28, lineHeight: 1.25, margin: "0 0 26px", fontWeight: 400 },
  h2: {
    fontSize: 15,
    fontWeight: 400,
    color: "#c9932f",
    margin: "24px 0 8px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  p: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13.5,
    lineHeight: 1.7,
    color: "rgba(245,240,230,0.75)",
    margin: 0,
  },
  note: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    fontStyle: "italic",
    color: "rgba(245,240,230,0.4)",
    marginTop: 28,
    paddingTop: 16,
    borderTop: "1px solid rgba(245,240,230,0.1)",
  },
};
