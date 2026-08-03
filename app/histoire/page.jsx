"use client";

import { useState, useEffect, useRef } from "react";

// --- Données du quiz -------------------------------------------------

const FAMILLES = {
  floral: {
    label: "Floral",
    desc: "Rose, jasmin, fleur d'oranger — élégant et lumineux",
    color: "#e07bb0",
    angle: 0,
    recos: [
      {
        nom: "Nom du parfum 1",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique. 2-4 phrases qui racontent une vraie histoire plutôt qu'une simple fiche produit.",
        lien: "#",
      },
      {
        nom: "Nom du parfum 2",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
    ],
  },
  boise: {
    label: "Boisé",
    desc: "Bois de santal, vétiver, cèdre — chaud et enveloppant",
    color: "#c98a4b",
    angle: 90,
    recos: [
      {
        nom: "Nom du parfum 1",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
      {
        nom: "Nom du parfum 2",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
    ],
  },
  oriental: {
    label: "Oriental",
    desc: "Vanille, ambre, épices — intense et sensuel",
    color: "#8b5fd9",
    angle: 180,
    recos: [
      {
        nom: "Nom du parfum 1",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
      {
        nom: "Nom du parfum 2",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
    ],
  },
  frais: {
    label: "Frais",
    desc: "Agrumes, notes marines, herbes vertes — léger et vif",
    color: "#3fc9c2",
    angle: 270,
    recos: [
      {
        nom: "Nom du parfum 1",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
      {
        nom: "Nom du parfum 2",
        marque: "Marque",
        accroche: "Une accroche courte et vendeuse (à rédiger)",
        histoire: "L'histoire du parfum : sa création, son inspiration, ce qui le rend unique.",
        lien: "#",
      },
    ],
  },
};

const QUESTIONS = [
  {
    id: "q1",
    title: "Un dimanche idéal ressemble plutôt à…",
    options: [
      { label: "Un brunch dans un jardin fleuri", points: { floral: 2 } },
      { label: "Une balade en forêt", points: { boise: 2 } },
      { label: "Un after-midi cocooning, plaid et bougie", points: { oriental: 2 } },
      { label: "Une baignade en mer tôt le matin", points: { frais: 2 } },
    ],
  },
  {
    id: "q2",
    title: "Pour l'occasion, tu portes le parfum surtout…",
    options: [
      { label: "Au quotidien, au bureau", points: { frais: 1, floral: 1 } },
      { label: "En soirée, pour marquer les esprits", points: { oriental: 2 } },
      { label: "Toute l'année, sans distinction", points: { boise: 1 } },
      { label: "Pour les grandes occasions", points: { oriental: 1, floral: 1 } },
    ],
  },
  {
    id: "q3",
    title: "L'intensité que tu recherches…",
    options: [
      { label: "Discrète, on doit s'approcher pour la sentir", points: { frais: 2 } },
      { label: "Présente sans envahir", points: { floral: 1, boise: 1 } },
      { label: "Marquante, un vrai sillage", points: { oriental: 2 } },
      { label: "Peu importe, tant qu'elle est unique", points: { boise: 2 } },
    ],
  },
  {
    id: "q4",
    title: "Le mot qui te correspond le plus…",
    options: [
      { label: "Romantique", points: { floral: 2 } },
      { label: "Mystérieux", points: { boise: 2, oriental: 1 } },
      { label: "Audacieux", points: { oriental: 2 } },
      { label: "Naturel", points: { frais: 2 } },
    ],
  },
  {
    id: "q5",
    title: "Il y a une ambiance olfactive que tu évites clairement…",
    options: [
      { label: "Les parfums trop fleuris, ça me dérange vite", points: { floral: -2 } },
      { label: "Les notes boisées/terreuses, pas trop mon truc", points: { boise: -2 } },
      { label: "Les parfums lourds, épicés ou sucrés", points: { oriental: -2 } },
      { label: "Non, je suis ouvert·e à tout", points: {} },
    ],
  },
];

const GENRE_OPTIONS = [
  { label: "Dans les codes classiquement féminins", value: "feminin" },
  { label: "Dans les codes classiquement masculins", value: "masculin" },
  { label: "Sans étiquette de genre, juste ce qui me ressemble", value: "unisexe" },
];

const SCAN_STEPS = [
  "Détection des notes dominantes…",
  "Calcul de l'affinité olfactive…",
  "Génération de ta signature…",
];

function useStarField(count = 140) {
  return useState(() =>
    Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.8 + 0.6,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 4,
    }))
  )[0];
}

function StarField({ revealCount }) {
  const stars = useStarField(140);
  return (
    <div style={styles.starLayer}>
      {stars.map((s, i) => {
        const visible = i < revealCount;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#f5f0e6",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease",
              animation: visible ? `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite` : "none",
              boxShadow: visible ? "0 0 4px rgba(245,240,230,0.6)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function AuraBackground({ percentages }) {
  const fams = Object.keys(FAMILLES);
  const configs = {
    floral: { top: "-14%", left: "-10%", anim: "floatA", duration: 16 },
    boise: { top: "-10%", left: "56%", anim: "floatB", duration: 20 },
    oriental: { top: "52%", left: "60%", anim: "floatC", duration: 18 },
    frais: { top: "56%", left: "-12%", anim: "floatD", duration: 22 },
  };
  return (
    <div style={styles.aura}>
      {fams.map((f) => {
        const cfg = configs[f];
        const pct = percentages[f] || 0;
        return (
          <div
            key={f}
            style={{
              position: "absolute",
              top: cfg.top,
              left: cfg.left,
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${FAMILLES[f].color} 0%, transparent 68%)`,
              filter: "blur(50px) saturate(1.4)",
              mixBlendMode: "screen",
              opacity: 0.3 + (pct / 100) * 0.7,
              transition: "opacity 1s ease",
              animation: `${cfg.anim} ${cfg.duration}s ease-in-out infinite`,
              pointerEvents: "none",
            }}
          />
        );
      })}
      <div style={styles.grain} />
    </div>
  );
}

// --- Petits composants génératifs -------------------------------------

function ScentOrb({ percentages, size = 150 }) {
  const stops = [];
  let acc = 0;
  Object.entries(percentages).forEach(([fam, pct]) => {
    const start = acc;
    acc += pct;
    stops.push(`${FAMILLES[fam].color} ${start}% ${acc}%`);
  });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        margin: "0 auto",
        background: `conic-gradient(${stops.join(", ")})`,
        boxShadow: `0 0 40px -6px rgba(201,147,47,0.5), 0 0 0 1px rgba(245,240,230,0.15)`,
        animation: "spin 14s linear infinite",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: "50%",
          background: "#0f0a14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

function RadarChart({ scores, maxScore, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const fams = Object.keys(FAMILLES);

  function pointFor(fam, value) {
    const angleRad = ((FAMILLES[fam].angle - 90) * Math.PI) / 180;
    const dist = (value / maxScore) * r;
    return [cx + dist * Math.cos(angleRad), cy + dist * Math.sin(angleRad)];
  }

  const dataPoints = fams.map((f) => pointFor(f, scores[f]));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  const rings = [0.33, 0.66, 1];

  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      {rings.map((ringPct, i) => {
        const pts = fams
          .map((f) => {
            const angleRad = ((FAMILLES[f].angle - 90) * Math.PI) / 180;
            const dist = ringPct * r;
            return `${cx + dist * Math.cos(angleRad)},${cy + dist * Math.sin(angleRad)}`;
          })
          .join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="rgba(245,240,230,0.12)"
            strokeWidth="1"
          />
        );
      })}
      {fams.map((f) => {
        const angleRad = ((FAMILLES[f].angle - 90) * Math.PI) / 180;
        const x2 = cx + r * Math.cos(angleRad);
        const y2 = cy + r * Math.sin(angleRad);
        const lx = cx + (r + 18) * Math.cos(angleRad);
        const ly = cy + (r + 18) * Math.sin(angleRad);
        return (
          <g key={f}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(245,240,230,0.12)" strokeWidth="1" />
            <text
              x={lx}
              y={ly}
              fill="rgba(245,240,230,0.55)"
              fontSize="10"
              fontFamily="'Helvetica Neue', Arial, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {FAMILLES[f].label}
            </text>
          </g>
        );
      })}
      <polygon
        points={dataPath}
        fill="rgba(201,147,47,0.22)"
        stroke="#c9932f"
        strokeWidth="1.5"
        style={{ transition: "all 0.6s ease" }}
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={FAMILLES[fams[i]].color} />
      ))}
    </svg>
  );
}

function useCountUp(target, durationMs = 900, start = false) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, durationMs]);
  return value;
}

// --- App principale ----------------------------------------------------

export default function App() {
  const [step, setStep] = useState(-1); // -1 intro, 0..N-1 questions, "scanning", "result"
  const [scores, setScores] = useState({ floral: 0, boise: 0, oriental: 0, frais: 0 });
  const [scanIndex, setScanIndex] = useState(0);
  const [openReco, setOpenReco] = useState(null);
  const [genrePref, setGenrePref] = useState(null);

  const totalSteps = QUESTIONS.length;

  function handleAnswer(points) {
    setScores((prev) => {
      const next = { ...prev };
      Object.entries(points).forEach(([fam, val]) => {
        next[fam] = Math.max(0, next[fam] + val);
      });
      return next;
    });
    const isLast = step === totalSteps - 1;
    setStep(isLast ? "genre" : step + 1);
  }

  function handleGenre(value) {
    setGenrePref(value);
    setStep("scanning");
  }

  useEffect(() => {
    if (step !== "scanning") return;
    setScanIndex(0);
    const t1 = setTimeout(() => setScanIndex(1), 550);
    const t2 = setTimeout(() => setScanIndex(2), 1100);
    const t3 = setTimeout(() => setStep("result"), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  function restart() {
    setScores({ floral: 0, boise: 0, oriental: 0, frais: 0 });
    setGenrePref(null);
    setStep(-1);
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const percentages = Object.fromEntries(
    Object.entries(scores).map(([f, v]) => [f, Math.round((v / total) * 100)])
  );
  const maxScore = Math.max(...Object.values(scores), 1);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0];
  const topPct = useCountUp(percentages[top], 1100, step === "result");

  const answeredCount = typeof step === "number" ? step : totalSteps;
  const starsToReveal = 20 + answeredCount * 22;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatA { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(60px,40px) scale(1.15); } 66% { transform: translate(-20px,60px) scale(0.95); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-50px,50px) scale(1.1); } 66% { transform: translate(-70px,-20px) scale(1.05); } }
        @keyframes floatC { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-60px,-40px) scale(1.2); } 66% { transform: translate(30px,-60px) scale(0.9); } }
        @keyframes floatD { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,-50px) scale(1.05); } 66% { transform: translate(70px,20px) scale(1.15); } }
        @keyframes twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
      `}</style>
      <StarField revealCount={starsToReveal} />
      <AuraBackground percentages={percentages} />
      <div style={styles.card}>
        {step === -1 && (
          <div style={styles.center}>
            <div style={styles.eyebrow}>Quiz olfactif</div>
            <h1 style={styles.h1}>Quel est ton profil de parfum ?</h1>
            <p style={styles.lead}>
              Quatre questions pour révéler ta signature olfactive, avant de
              découvrir des parfums de niche taillés pour toi.
            </p>
            <button style={styles.primaryBtn} onClick={() => setStep(0)}>
              Commencer
            </button>
          </div>
        )}

        {typeof step === "number" && step >= 0 && step < totalSteps && (
          <div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${(step / totalSteps) * 100}%` }} />
            </div>
            <div style={styles.stepLabel}>Question {step + 1} / {totalSteps}</div>
            <h2 style={styles.h2}>{QUESTIONS[step].title}</h2>
            <div style={styles.optionsGrid}>
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={i}
                  style={styles.optionBtn}
                  onClick={() => handleAnswer(opt.points)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9932f")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,230,0.15)")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "genre" && (
          <div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: "100%" }} />
            </div>
            <div style={styles.stepLabel}>Dernière question</div>
            <h2 style={styles.h2}>Le parfum que tu cherches, tu le veux plutôt…</h2>
            <div style={styles.optionsGrid}>
              {GENRE_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  style={styles.optionBtn}
                  onClick={() => handleGenre(opt.value)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9932f")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,240,230,0.15)")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "scanning" && (
          <div style={{ ...styles.center, padding: "20px 0" }}>
            <div style={styles.scanRing} />
            <div style={styles.eyebrow}>Analyse en cours</div>
            <div style={{ marginTop: 18 }}>
              {SCAN_STEPS.map((label, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.scanLine,
                    opacity: i <= scanIndex ? 1 : 0.25,
                    animation: i === scanIndex ? "pulse 1s ease infinite" : "none",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "result" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div style={{ ...styles.center, marginBottom: 8 }}>
              <ScentOrb percentages={percentages} />
            </div>
            <div style={{ ...styles.center, marginTop: 18 }}>
              <div style={styles.eyebrow}>Ta signature olfactive</div>
              <div style={styles.bigPct}>{topPct}%</div>
              <h1 style={{ ...styles.h1, marginTop: 0 }}>{FAMILLES[top].label}</h1>
              <p style={styles.lead}>{FAMILLES[top].desc}</p>
              {genrePref && (
                <div style={styles.genreTag}>
                  {GENRE_OPTIONS.find((g) => g.value === genrePref)?.label}
                </div>
              )}
            </div>

            <RadarChart scores={scores} maxScore={maxScore} />

            <div style={styles.recosSection}>
              <div style={styles.recosLabel}>Sélectionnés pour ton profil</div>
              {FAMILLES[top].recos.map((p, i) => {
                const isOpen = openReco === i;
                return (
                  <div key={i} style={styles.recoCard}>
                    <button
                      style={styles.recoHeader}
                      onClick={() => setOpenReco(isOpen ? null : i)}
                    >
                      <div style={{ ...styles.recoDot, background: FAMILLES[top].color }} />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={styles.recoName}>{p.nom}</div>
                        <div style={styles.recoBrand}>{p.marque}</div>
                        <div style={styles.recoAccroche}>{p.accroche}</div>
                      </div>
                      <div style={{ ...styles.recoChevron, transform: isOpen ? "rotate(180deg)" : "none" }}>
                        ⌄
                      </div>
                    </button>
                    {isOpen && (
                      <div style={styles.recoBody}>
                        <p style={styles.recoHistoire}>{p.histoire}</p>
                        <a href={p.lien} target="_blank" rel="noopener noreferrer" style={styles.recoBtn}>
                          Découvrir ce parfum
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ ...styles.center }}>
              <button style={styles.secondaryBtn} onClick={restart}>
                Refaire le quiz
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={styles.footerLinks}>
        <a href="/a-propos" style={styles.footerLink}>
          Pourquoi Aunez ?
        </a>
        <a href="/histoire" style={styles.footerLink}>
          Histoire du parfum
        </a>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "'Georgia', 'Iowan Old Style', serif",
    position: "relative",
    overflow: "hidden",
  },
  aura: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  starLayer: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "3px 3px",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 480,
    background: "rgba(20,15,26,0.6)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(245,240,230,0.14)",
    borderRadius: 6,
    padding: "40px 32px",
    boxShadow: "0 20px 70px rgba(0,0,0,0.55)",
    color: "#f5f0e6",
  },
  footerLink: {
    position: "relative",
    zIndex: 1,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    color: "rgba(245,240,230,0.4)",
    textDecoration: "none",
    letterSpacing: "0.04em",
  },
  footerLinks: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: 20,
    marginTop: 18,
  },
  center: { textAlign: "center" },
  eyebrow: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9932f",
    marginBottom: 14,
  },
  h1: { fontSize: 32, lineHeight: 1.2, margin: "0 0 14px", fontWeight: 400 },
  h2: { fontSize: 22, lineHeight: 1.35, margin: "18px 0 24px", fontWeight: 400 },
  lead: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.75)",
    margin: "0 0 28px",
  },
  bigPct: {
    fontSize: 52,
    fontWeight: 300,
    letterSpacing: "-0.02em",
    color: "#c9932f",
    margin: "6px 0 2px",
  },
  genreTag: {
    display: "inline-block",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.04em",
    color: "rgba(245,240,230,0.55)",
    background: "rgba(245,240,230,0.06)",
    border: "1px solid rgba(245,240,230,0.15)",
    borderRadius: 20,
    padding: "5px 14px",
    marginBottom: 24,
  },
  primaryBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "#c9932f",
    color: "#1b1420",
    border: "none",
    borderRadius: 2,
    padding: "13px 30px",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "transparent",
    color: "#f5f0e6",
    border: "1px solid rgba(245,240,230,0.3)",
    borderRadius: 2,
    padding: "12px 26px",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: 20,
  },
  progressTrack: {
    height: 2,
    width: "100%",
    background: "rgba(245,240,230,0.15)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: { height: "100%", background: "#c9932f", transition: "width 0.3s ease" },
  stepLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(245,240,230,0.5)",
  },
  optionsGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  optionBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    textAlign: "left",
    background: "rgba(245,240,230,0.04)",
    border: "1px solid rgba(245,240,230,0.15)",
    borderRadius: 3,
    padding: "14px 16px",
    color: "#f5f0e6",
    fontSize: 14.5,
    cursor: "pointer",
    transition: "border-color 0.2s ease",
  },
  scanRing: {
    width: 64,
    height: 64,
    margin: "0 auto 20px",
    borderRadius: "50%",
    border: "2px solid rgba(245,240,230,0.15)",
    borderTopColor: "#c9932f",
    animation: "spin 1s linear infinite",
  },
  scanLine: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    color: "rgba(245,240,230,0.8)",
    marginBottom: 8,
    transition: "opacity 0.3s ease",
  },
  resultNote: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(245,240,230,0.6)",
    background: "rgba(245,240,230,0.04)",
    border: "1px dashed rgba(245,240,230,0.2)",
    borderRadius: 3,
    padding: 14,
    margin: "20px 0 8px",
  },
  recosSection: { margin: "24px 0 8px" },
  recosLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(245,240,230,0.5)",
    marginBottom: 12,
  },
  recoCard: {
    background: "rgba(245,240,230,0.04)",
    border: "1px solid rgba(245,240,230,0.12)",
    borderRadius: 4,
    marginBottom: 10,
    overflow: "hidden",
  },
  recoHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "transparent",
    border: "none",
    padding: "14px 16px",
    cursor: "pointer",
    color: "#f5f0e6",
  },
  recoDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  recoName: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    fontWeight: 600,
  },
  recoBrand: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11.5,
    color: "rgba(245,240,230,0.5)",
    margin: "2px 0 4px",
  },
  recoAccroche: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12.5,
    fontStyle: "italic",
    color: "rgba(245,240,230,0.7)",
  },
  recoChevron: {
    fontSize: 16,
    color: "rgba(245,240,230,0.4)",
    transition: "transform 0.25s ease",
    flexShrink: 0,
  },
  recoBody: {
    padding: "0 16px 18px",
    borderTop: "1px solid rgba(245,240,230,0.08)",
    animation: "fadeUp 0.3s ease",
  },
  recoHistoire: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 13,
    lineHeight: 1.65,
    color: "rgba(245,240,230,0.75)",
    margin: "14px 0 16px",
  },
  recoBtn: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 11.5,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#c9932f",
    border: "1px solid rgba(201,147,47,0.4)",
    borderRadius: 3,
    padding: "6px 12px",
    textDecoration: "none",
    flexShrink: 0,
  },
};
