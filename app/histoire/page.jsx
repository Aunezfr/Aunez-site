"use client";

import { useState } from "react";
import Link from "next/link";

const PAGES = [
  {
    era: "Antiquité",
    period: "env. 3000 av. J.-C.",
    title: "Les origines",
    text: "Le parfum naît en Mésopotamie et en Égypte ancienne, où l'on brûle des résines et des bois odorants pour les rituels religieux — le mot \"parfum\" vient du latin per fumum, \"par la fumée\". Les Égyptiens l'associent aussi à la beauté et à l'embaumement.",
    icon: "urn",
    material: "papyrus",
  },
  {
    era: "Monde arabe",
    period: "env. l'an 1000",
    title: "La révolution technique",
    text: "Le médecin et savant perse Avicenne perfectionne la distillation à la vapeur, permettant d'extraire l'essence pure des fleurs — notamment la rose. Une avancée décisive qui rendra possible la parfumerie moderne.",
    icon: "alembic",
    material: "parchemin",
  },
  {
    era: "Grasse, France",
    period: "XVIe – XVIIIe siècle",
    title: "La naissance d'une capitale",
    text: "Grâce à son climat et ses champs de fleurs, la ville de Grasse devient le cœur mondial de la parfumerie. Les \"nez\" y perfectionnent leur art, d'abord pour parfumer les gants des aristocrates.",
    icon: "flower",
    material: "papier-ancien",
  },
  {
    era: "XIXe siècle",
    period: "1889",
    title: "L'ère de la chimie",
    text: "L'invention des molécules de synthèse libère les parfumeurs des seules matières naturelles. Guerlain lance Jicky, considéré comme le premier grand parfum moderne, mêlant naturel et synthétique.",
    icon: "flask",
    material: "papier-technique",
  },
  {
    era: "XXe siècle",
    period: "1921",
    title: "L'âge d'or des maisons",
    text: "Chanel N°5 marque l'entrée du parfum dans la culture de masse et le luxe. Les grandes maisons de couture — Dior, Chanel, Yves Saint Laurent — dominent le marché pendant des décennies.",
    icon: "bottle",
    material: "papier-glace",
  },
  {
    era: "Depuis les années 1990",
    period: "aujourd'hui",
    title: "Le retour du sur-mesure",
    text: "Fatigués de l'uniformisation, des créateurs indépendants fondent la parfumerie de niche : moins de compromis marketing, plus de liberté artistique. C'est le mouvement dans lequel s'inscrit une partie de l'esprit d'Aunez.",
    icon: "spark",
    material: "verre",
  },
];

const MATERIALS = {
  papyrus: {
    background: "linear-gradient(160deg, #cbb073 0%, #b89857 50%, #cbb073 100%)",
    border: "1px solid rgba(60,40,10,0.35)",
    color: "#3a2c14",
    accent: "#5a3d18",
    fontFamily: "'Iowan Old Style', 'Georgia', serif",
    texture: "repeating-linear-gradient(90deg, rgba(60,40,10,0.05) 0px, transparent 2px, transparent 6px)",
  },
  parchemin: {
    background: "linear-gradient(160deg, #ddc99a 0%, #cbb27e 55%, #ddc99a 100%)",
    border: "1px solid rgba(70,45,10,0.35)",
    color: "#3f2c14",
    accent: "#8a5a1f",
    fontFamily: "'Iowan Old Style', 'Georgia', serif",
    texture: "repeating-linear-gradient(0deg, rgba(70,45,10,0.04) 0px, transparent 2px, transparent 7px)",
  },
  "papier-ancien": {
    background: "linear-gradient(160deg, #efe3c8 0%, #e6d5ae 55%, #efe3c8 100%)",
    border: "1px solid rgba(120,90,40,0.3)",
    color: "#3a2f1c",
    accent: "#96702e",
    fontFamily: "'Iowan Old Style', 'Georgia', serif",
    texture: "none",
  },
  "papier-technique": {
    background: "linear-gradient(160deg, #f2ede1 0%, #e9e2d0 100%)",
    border: "1px solid rgba(90,90,70,0.3)",
    color: "#2c2a22",
    accent: "#6b6248",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    texture:
      "repeating-linear-gradient(0deg, rgba(90,90,70,0.08) 0px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, rgba(90,90,70,0.08) 0px, transparent 1px, transparent 22px)",
  },
  "papier-glace": {
    background: "linear-gradient(160deg, #f7f5f0 0%, #ece7dc 100%)",
    border: "1px solid rgba(180,150,80,0.4)",
    color: "#201d18",
    accent: "#a8791f",
    fontFamily: "'Georgia', serif",
    texture: "none",
  },
  verre: {
    background: "rgba(20,15,26,0.6)",
    border: "1px solid rgba(245,240,230,0.14)",
    color: "#f5f0e6",
    accent: "#c9932f",
    fontFamily: "'Georgia', serif",
    texture: "none",
    glass: true,
  },
};

function Illustration({ name, color }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 100 100" width="68" height="68">
      {name === "urn" && (
        <>
          <path {...common} d="M38 30 Q50 10 62 30" />
          <path {...common} d="M35 30 L65 30 L60 78 Q50 84 40 78 Z" />
          <path {...common} d="M42 30 L58 30" />
          <path {...common} d="M46 46 Q50 40 54 46" opacity="0.6" />
          <path {...common} d="M45 38 Q50 30 55 38" opacity="0.4" />
        </>
      )}
      {name === "alembic" && (
        <>
          <circle {...common} cx="42" cy="55" r="18" />
          <path {...common} d="M50 40 L68 22" />
          <path {...common} d="M68 22 L78 22 L78 30" />
          <path {...common} d="M42 37 L42 30" />
          <circle cx="42" cy="55" r="3" fill={color} stroke="none" />
        </>
      )}
      {name === "flower" && (
        <>
          <circle {...common} cx="50" cy="42" r="7" />
          <path {...common} d="M50 35 Q40 25 43 15 Q50 20 50 35" />
          <path {...common} d="M50 35 Q60 25 57 15 Q50 20 50 35" />
          <path {...common} d="M43 45 Q28 45 25 55 Q35 58 45 49" />
          <path {...common} d="M57 45 Q72 45 75 55 Q65 58 55 49" />
          <path {...common} d="M50 49 L50 82" />
          <path {...common} d="M50 65 Q40 65 38 72" />
        </>
      )}
      {name === "flask" && (
        <>
          <path {...common} d="M44 20 L44 42 L28 76 Q30 80 50 80 Q70 80 72 76 L56 42 L56 20" />
          <path {...common} d="M40 20 L60 20" />
          <circle cx="44" cy="60" r="2.2" fill={color} stroke="none" />
          <circle cx="55" cy="66" r="2.2" fill={color} stroke="none" />
          <circle cx="49" cy="72" r="2.2" fill={color} stroke="none" />
          <path {...common} d="M35 55 L65 55" opacity="0.5" />
        </>
      )}
      {name === "bottle" && (
        <>
          <path {...common} d="M42 30 L58 30 L58 40 L64 46 L64 78 Q64 82 60 82 L40 82 Q36 82 36 78 L36 46 L42 40 Z" />
          <path {...common} d="M46 22 L54 22 L54 30 L46 30 Z" />
          <path {...common} d="M36 55 L64 55" opacity="0.5" />
        </>
      )}
      {name === "spark" && (
        <>
          <path {...common} d="M50 15 L56 42 L82 48 L56 54 L50 82 L44 54 L18 48 L44 42 Z" />
          <circle cx="50" cy="48" r="4" fill={color} stroke="none" />
        </>
      )}
    </svg>
  );
}

function PageContent({ p, m, onPrev, onNext, canPrev, canNext }) {
  return (
    <>
      {m.texture !== "none" && <div style={{ ...styles.texture, backgroundImage: m.texture }} />}
      <div style={styles.iconWrap}>
        <Illustration name={p.icon} color={m.accent} />
        <button
          aria-label="Page précédente"
          onClick={onPrev}
          disabled={!canPrev}
          style={{ ...styles.iconZone, left: 0, cursor: canPrev ? "pointer" : "default" }}
        />
        <button
          aria-label="Page suivante"
          onClick={onNext}
          disabled={!canNext}
          style={{ ...styles.iconZone, right: 0, cursor: canNext ? "pointer" : "default" }}
        />
      </div>
      <div style={{ ...styles.period, color: m.accent }}>{p.period}</div>
      <h2 style={{ ...styles.era, color: m.accent }}>{p.era}</h2>
      <div style={{ ...styles.title, color: m.color }}>{p.title}</div>
      <p style={{ ...styles.text, color: m.color }}>{p.text}</p>
    </>
  );
}

export default function HistoireDuParfum() {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState(1);
  const [nextIndex, setNextIndex] = useState(null);

  function go(delta) {
    const target = index + delta;
    if (target < 0 || target >= PAGES.length || flipping) return;
    setDir(delta);
    setNextIndex(target);
    setFlipping(true);
    setTimeout(() => {
      setIndex(target);
      setFlipping(false);
      setNextIndex(null);
    }, 420);
  }

  const current = PAGES[index];
  const currentM = MATERIALS[current.material];
  const below = nextIndex !== null ? PAGES[nextIndex] : null;
  const belowM = below ? MATERIALS[below.material] : null;

  return (
    <div style={styles.page}>
      <div style={styles.vignette} />
      <div style={styles.wrap}>
        <Link href="/" style={styles.back}>
          ← Retour au quiz
        </Link>

        <div style={styles.eyebrow}>Histoire du parfum</div>

        <div style={styles.stage}>
          <div style={styles.bookShell}>
            {below && (
              <div
                style={{
                  ...styles.book,
                  ...styles.bookLayer,
                  background: belowM.background,
                  border: belowM.border,
                  fontFamily: belowM.fontFamily,
                  backdropFilter: belowM.glass ? "blur(22px)" : "none",
                  WebkitBackdropFilter: belowM.glass ? "blur(22px)" : "none",
                }}
              >
                <PageContent p={below} m={belowM} />
              </div>
            )}
            <div
              style={{
                ...styles.book,
                ...styles.bookLayer,
                background: currentM.background,
                border: currentM.border,
                fontFamily: currentM.fontFamily,
                backdropFilter: currentM.glass ? "blur(22px)" : "none",
                WebkitBackdropFilter: currentM.glass ? "blur(22px)" : "none",
                boxShadow: flipping
                  ? "4px 0 24px rgba(0,0,0,0.45)"
                  : currentM.glass
                  ? "0 20px 70px rgba(0,0,0,0.55)"
                  : "0 18px 40px rgba(0,0,0,0.5)",
                transformOrigin: dir > 0 ? "left center" : "right center",
                transform: flipping ? `rotateY(${dir > 0 ? -175 : 175}deg)` : "rotateY(0deg)",
                transition: flipping ? "transform 0.42s cubic-bezier(0.45, 0, 0.55, 1)" : "none",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                zIndex: 2,
              }}
            >
              <PageContent p={current} m={currentM} onPrev={() => go(-1)} onNext={() => go(1)} canPrev={index > 0} canNext={index < PAGES.length - 1} />
            </div>
          </div>

          <div style={styles.nav}>
            <button
              style={{ ...styles.navBtn, opacity: index === 0 ? 0.3 : 1 }}
              onClick={() => go(-1)}
              disabled={index === 0}
            >
              ← page précédente
            </button>
            <div style={styles.dots}>
              {PAGES.map((_, i) => (
                <div key={i} style={{ ...styles.dot, opacity: i === index ? 1 : 0.25 }} />
              ))}
            </div>
            <button
              style={{ ...styles.navBtn, opacity: index === PAGES.length - 1 ? 0.3 : 1 }}
              onClick={() => go(1)}
              disabled={index === PAGES.length - 1}
            >
              page suivante →
            </button>
          </div>
        </div>
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
    justifyContent: "center",
    padding: "24px",
    fontFamily: "'Georgia', 'Iowan Old Style', serif",
    position: "relative",
    overflow: "hidden",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 50% 10%, rgba(201,147,47,0.14), transparent 60%)",
    pointerEvents: "none",
  },
  wrap: {
    position: "relative",
    width: "100%",
    maxWidth: 560,
    paddingTop: 20,
  },
  back: {
    display: "inline-block",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    color: "rgba(245,240,230,0.55)",
    textDecoration: "none",
    marginBottom: 22,
  },
  eyebrow: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9932f",
    marginBottom: 22,
  },
  stage: { perspective: "1600px" },
  bookShell: {
    position: "relative",
    minHeight: 300,
  },
  book: {
    borderRadius: 6,
    padding: "36px 32px",
    minHeight: 300,
    textAlign: "center",
    overflow: "hidden",
  },
  bookLayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
  },
  texture: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  fold: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    transition: "opacity 0.3s ease",
  },
  iconWrap: { marginBottom: 14, position: "relative", display: "inline-block" },
  iconZone: {
    position: "absolute",
    top: "-14px",
    bottom: "-14px",
    width: "50%",
    background: "transparent",
    border: "none",
    padding: 0,
  },
  period: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.1em",
    marginBottom: 6,
    position: "relative",
  },
  era: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 2px",
    position: "relative",
  },
  title: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 16,
    opacity: 0.75,
    position: "relative",
  },
  text: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    lineHeight: 1.7,
    margin: 0,
    textAlign: "left",
    opacity: 0.85,
    position: "relative",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    padding: "0 4px",
  },
  navBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    background: "transparent",
    border: "none",
    color: "#f5f0e6",
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
  dots: { display: "flex", gap: 6 },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#c9932f",
    transition: "opacity 0.2s ease",
  },
};
