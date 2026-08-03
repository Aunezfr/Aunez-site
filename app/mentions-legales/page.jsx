export const metadata = {
  title: "Mentions légales — Aunez",
};

export default function MentionsLegales() {
  return (
    <div style={styles.page}>
      <div style={styles.vignette} />
      <div style={styles.card}>
        <a href="/" style={styles.back}>
          ← Retour au quiz
        </a>
        <div style={styles.eyebrow}>Mentions légales</div>
        <h1 style={styles.h1}>Mentions légales</h1>

        <h2 style={styles.h2}>Édition du site</h2>
        <p style={styles.p}>
          Le site Aunez (aunez.fr) est édité à titre personnel. Conformément
          à l'article 6-III de la loi n°2004-575 du 21 juin 2004 pour la
          confiance dans l'économie numérique, l'identité de l'éditeur est
          communicable à toute autorité judiciaire qui en ferait la demande
          auprès de l'hébergeur mentionné ci-dessous.
        </p>

        <h2 style={styles.h2}>Hébergement</h2>
        <p style={styles.p}>
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
          Walnut, CA 91789, États-Unis.
          <br />
          Le nom de domaine est enregistré chez OVH SAS, 2 rue Kellermann,
          59100 Roubaix, France.
        </p>

        <h2 style={styles.h2}>Liens affiliés</h2>
        <p style={styles.p}>
          Aunez participe à des programmes d'affiliation. Certains liens
          présents sur le site sont des liens affiliés : si vous effectuez
          un achat via l'un de ces liens, Aunez peut percevoir une
          commission, sans coût supplémentaire pour vous. Cela n'influence
          pas l'objectivité des recommandations proposées.
        </p>

        <h2 style={styles.h2}>Propriété intellectuelle</h2>
        <p style={styles.p}>
          L'ensemble des contenus présents sur ce site (textes, quiz,
          illustrations, mise en page) est la propriété d'Aunez, sauf
          mention contraire. Toute reproduction sans autorisation est
          interdite.
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
