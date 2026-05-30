import { useState } from "react";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",marginLeft:4,verticalAlign:"middle",opacity:0.6}}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

function formatMonths(months) {
  return isFinite(months) ? months.toFixed(1) : "∞";
}

function formatDays(months) {
  if (!isFinite(months)) return "∞ days";
  const days = Math.round(months * 30.44);
  return `${days.toLocaleString()} days`;
}

function getStatus(months) {
  if (!isFinite(months) || months > 12) return "safe";
  if (months >= 6) return "stable";
  if (months >= 3) return "warning";
  return "critical";
}

const STATUS_CONFIG = {
  safe:     { label: "SAFE",     lightBg: "#f0fdf4", lightText: "#15803d", darkBg: "#052e16", darkText: "#4ade80" },
  stable:   { label: "STABLE",   lightBg: "#fefce8", lightText: "#a16207", darkBg: "#1c1400", darkText: "#facc15" },
  warning:  { label: "WARNING",  lightBg: "#fff7ed", lightText: "#c2410c", darkBg: "#1c0a00", darkText: "#fb923c" },
  critical: { label: "CRITICAL", lightBg: "#fef2f2", lightText: "#b91c1c", darkBg: "#1c0000", darkText: "#f87171" },
};

export default function App() {
  const [dark, setDark] = useState(true);
  const [savings, setSavings] = useState("");
  const [essential, setEssential] = useState("");
  const [variable, setVariable] = useState("");
  const [tooltip, setTooltip] = useState(null);

  const s = parseFloat(savings) || 0;
  const e = parseFloat(essential) || 0;
  const v = parseFloat(variable) || 0;
  const totalBurn = e + v;
  const survivalBurn = e + v * 0.5;

  const runwayMonths = totalBurn > 0 ? s / totalBurn : Infinity;
  const survivalMonths = survivalBurn > 0 ? s / survivalBurn : Infinity;

  const hasInput = s > 0 && totalBurn > 0;

  const runwayStatus = hasInput ? getStatus(runwayMonths) : null;
  const survivalStatus = hasInput ? getStatus(survivalMonths) : null;

  // Theme tokens
  const T = {
    bg:           dark ? "#0f172a" : "#f1f5f9",
    cardBg:       dark ? "#ffffff" : "#ffffff",
    cardText:     dark ? "#1e293b" : "#1e293b",
    labelColor:   dark ? "#64748b" : "#64748b",
    inputBg:      dark ? "#ffffff" : "#ffffff",
    inputBorder:  dark ? "#e2e8f0" : "#e2e8f0",
    inputFocus:   "#3b82f6",
    ctaBg:        dark ? "#1e293b" : "#1e293b",
    ctaText:      "#ffffff",
    ctaAccent:    "#f59e0b",
    toggleBg:     dark ? "#334155" : "#e2e8f0",
    toggleText:   dark ? "#f1f5f9" : "#475569",
    footerText:   dark ? "#64748b" : "#94a3b8",
    shadow:       dark ? "0 25px 50px rgba(0,0,0,0.5)" : "0 25px 50px rgba(0,0,0,0.12)",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: T.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "24px 16px 48px",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      transition: "background 0.3s",
    },
    topBar: {
      width: "100%",
      maxWidth: 560,
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 12,
    },
    toggleBtn: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      borderRadius: 20,
      border: "none",
      background: T.toggleBg,
      color: T.toggleText,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
      transition: "all 0.2s",
    },
    card: {
      background: T.cardBg,
      borderRadius: 16,
      padding: "32px 28px",
      width: "100%",
      maxWidth: 560,
      boxShadow: T.shadow,
      transition: "all 0.3s",
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: T.labelColor,
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
    },
    inputWrap: {
      display: "flex",
      alignItems: "center",
      border: `1.5px solid ${T.inputBorder}`,
      borderRadius: 10,
      background: T.inputBg,
      padding: "0 14px",
      marginBottom: 20,
      transition: "border-color 0.2s",
    },
    dollarSign: {
      color: T.labelColor,
      fontWeight: 700,
      fontSize: 16,
      marginRight: 8,
      userSelect: "none",
    },
    input: {
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: 18,
      fontWeight: 700,
      color: T.cardText,
      padding: "14px 0",
      width: "100%",
    },
    divider: {
      borderTop: `1px solid ${T.inputBorder}`,
      margin: "8px 0 20px",
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      color: T.labelColor,
      textAlign: "center",
      marginBottom: 14,
    },
    resultCard: (status) => {
      const cfg = STATUS_CONFIG[status];
      return {
        background: dark ? cfg.darkBg : cfg.lightBg,
        borderRadius: 12,
        padding: "20px 20px 16px",
        marginBottom: 12,
        position: "relative",
        transition: "background 0.3s",
      };
    },
    resultMonths: (status) => ({
      fontSize: 56,
      fontWeight: 900,
      lineHeight: 1,
      color: dark ? STATUS_CONFIG[status].darkText : STATUS_CONFIG[status].lightText,
      fontVariantNumeric: "tabular-nums",
    }),
    resultDays: (status) => ({
      fontSize: 14,
      fontWeight: 600,
      color: dark ? STATUS_CONFIG[status].darkText : STATUS_CONFIG[status].lightText,
      opacity: 0.75,
      marginTop: 4,
      marginBottom: 6,
      letterSpacing: "0.02em",
    }),
    resultLabel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: T.labelColor,
      marginTop: 2,
    },
    badge: (status) => {
      const cfg = STATUS_CONFIG[status];
      return {
        position: "absolute",
        top: 16,
        right: 16,
        background: dark ? cfg.darkText : cfg.lightText,
        color: dark ? cfg.darkBg : "#fff",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.1em",
        padding: "3px 8px",
        borderRadius: 4,
      };
    },
    placeholder: {
      textAlign: "center",
      color: T.labelColor,
      fontSize: 14,
      padding: "24px 0",
      opacity: 0.6,
    },
    cta: {
      background: T.ctaBg,
      borderRadius: 16,
      padding: "28px 28px 24px",
      width: "100%",
      maxWidth: 560,
      marginTop: 16,
      boxShadow: T.shadow,
    },
    ctaEyebrow: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      color: T.ctaAccent,
      marginBottom: 8,
    },
    ctaHeadline: {
      fontSize: 22,
      fontWeight: 800,
      color: T.ctaText,
      marginBottom: 18,
      lineHeight: 1.2,
    },
    ctaItem: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#cbd5e1",
      fontSize: 14,
      marginBottom: 10,
    },
    ctaIcon: {
      fontSize: 18,
      width: 24,
      textAlign: "center",
    },
    ctaBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "16px 24px",
      background: T.ctaAccent,
      color: "#1c1000",
      borderRadius: 10,
      border: "none",
      fontSize: 16,
      fontWeight: 800,
      cursor: "pointer",
      marginTop: 20,
      letterSpacing: "0.01em",
      transition: "opacity 0.2s",
    },
    footer: {
      fontSize: 11,
      color: T.footerText,
      textAlign: "center",
      marginTop: 20,
      maxWidth: 560,
    },
    tooltipWrap: {
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
    },
    tooltipBox: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#1e293b",
      color: "#f1f5f9",
      fontSize: 12,
      padding: "8px 12px",
      borderRadius: 8,
      whiteSpace: "nowrap",
      zIndex: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      pointerEvents: "none",
    },
  };

  const tooltips = {
    essential: "Rent, utilities, insurance, debt minimums — costs you can't avoid",
    variable: "Food, transport, subscriptions, dining — costs you can reduce",
  };

  return (
    <div style={styles.page}>
      {/* Theme Toggle */}
      <div style={styles.topBar}>
        <button style={styles.toggleBtn} onClick={() => setDark(!dark)}>
          {dark ? <SunIcon /> : <MoonIcon />}
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      {/* Main Card */}
      <div style={styles.card}>
        {/* Inputs */}
        <div style={styles.fieldLabel}>CURRENT SAVINGS</div>
        <div style={styles.inputWrap}>
          <span style={styles.dollarSign}>$</span>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            value={savings}
            onChange={e => setSavings(e.target.value)}
          />
        </div>

        <div style={styles.fieldLabel}>
          MONTHLY ESSENTIAL EXPENSES
          <span
            style={styles.tooltipWrap}
            onMouseEnter={() => setTooltip("essential")}
            onMouseLeave={() => setTooltip(null)}
          >
            <InfoIcon />
            {tooltip === "essential" && (
              <div style={styles.tooltipBox}>{tooltips.essential}</div>
            )}
          </span>
        </div>
        <div style={styles.inputWrap}>
          <span style={styles.dollarSign}>$</span>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            value={essential}
            onChange={e => setEssential(e.target.value)}
          />
        </div>

        <div style={styles.fieldLabel}>
          MONTHLY VARIABLE EXPENSES
          <span
            style={styles.tooltipWrap}
            onMouseEnter={() => setTooltip("variable")}
            onMouseLeave={() => setTooltip(null)}
          >
            <InfoIcon />
            {tooltip === "variable" && (
              <div style={styles.tooltipBox}>{tooltips.variable}</div>
            )}
          </span>
        </div>
        <div style={styles.inputWrap}>
          <span style={styles.dollarSign}>$</span>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            value={variable}
            onChange={e => setVariable(e.target.value)}
          />
        </div>

        {/* Divider */}
        <div style={styles.divider} />
        <div style={styles.sectionLabel}>YOUR RUNWAY</div>

        {/* Results */}
        {hasInput ? (
          <>
            {/* Standard Runway */}
            <div style={styles.resultCard(runwayStatus)}>
              <div style={styles.resultMonths(runwayStatus)}>
                {formatMonths(runwayMonths)}
              </div>
              <div style={styles.resultDays(runwayStatus)}>
                {formatDays(runwayMonths)}
              </div>
              <div style={styles.resultLabel}>MONTHS OF RUNWAY</div>
              <div style={styles.badge(runwayStatus)}>
                {STATUS_CONFIG[runwayStatus].label}
              </div>
            </div>

            {/* Survival Mode */}
            <div style={styles.resultCard(survivalStatus)}>
              <div style={styles.resultMonths(survivalStatus)}>
                {formatMonths(survivalMonths)}
              </div>
              <div style={styles.resultDays(survivalStatus)}>
                {formatDays(survivalMonths)}
              </div>
              <div style={styles.resultLabel}>
                MONTHS IN SURVIVAL MODE — 50% VARIABLE CUTS
              </div>
              <div style={styles.badge(survivalStatus)}>
                {STATUS_CONFIG[survivalStatus].label}
              </div>
            </div>
          </>
        ) : (
          <div style={styles.placeholder}>
            Enter your numbers above to see your runway
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div style={styles.cta}>
        <div style={styles.ctaEyebrow}>WANT THE FULL PICTURE?</div>
        <div style={styles.ctaHeadline}>Layoff Survival Financial Kit</div>

        {[
          ["📄", "Severance Analyzer"],
          ["🏥", "COBRA vs. ACA Comparison"],
          ["🎯", "Emergency Budget Mode"],
          ["📊", "Unemployment Estimator"],
          ["✅", "Day 1 Financial Checklist"],
        ].map(([icon, label]) => (
          <div key={label} style={styles.ctaItem}>
            <span style={styles.ctaIcon}>{icon}</span>
            {label}
          </div>
        ))}

        <button
          style={styles.ctaBtn}
          onClick={() => window.open("https://gumroad.com", "_blank")}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get the Full Kit — $34 →
        </button>
      </div>

      <div style={styles.footer}>
        Estimates only. Consult a financial advisor for personalized guidance.
      </div>
    </div>
  );
}
