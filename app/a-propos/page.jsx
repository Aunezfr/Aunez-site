export const metadata = {
  title: "Pourquoi Aunez",
  description: "L'histoire et la mission derrière Aunez.",
};

export default function APropos() {
  return (
    <div style={styles.page}>
      <div style={styles.vignette} />
      <div style={styles.card}>
        <a href="/" style={styles.back}>
          ← Retour au quiz
        </a>

        <div style={styles.eyebrow}>À propos</div>
        <h1 style={styles.h1}>Pourquoi Aunez</h1>

        <p style={styles.p}>
          On choisit rarement un parfum. On hérite d'une habitude — celui
          que portait un proche, celui qu'on nous a offert, celui qui
          était en rayon au bon moment. On garde cette histoire-là, sans
          jamais prendre le temps d'écrire la sienne.
        </p>

        <p style={styles.p}>
          Aunez est né de cette idée simple&nbsp;: et si trouver son parfum,
          c'était d'abord se trouver soi&nbsp;? Pas une liste de
          best-sellers, pas un classement sponsorisé — un vrai temps pour
          comprendre ce qui nous ressemble, avant de découvrir ce qui existe.
        </p>

        <p style={styles.p}>
          Le quiz que tu viens de faire n'est qu'un début. Chaque parfum
          recommandé ici est choisi avec la même exigence&nbsp;: mérite-t-il
          vraiment sa place dans ton histoire olfactive, ou n'est-il là que
          parce qu'il se vend bien&nbsp;?
        </p>

        <p style={{ ...styles.p, marginBottom: 0 }}>
          Aunez ne cherche pas à te vendre un parfum de plus. Il cherche à
          t'aider à trouver le tien.
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
  h1: {
    fontSize: 30,
    lineHeight: 1.25,
    margin: "0 0 26px",
    fontWeight: 400,
  },
  p: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14.5,
    lineHeight: 1.75,
    color: "rgba(245,240,230,0.8)",
    margin: "0 0 18px",
  },
};
