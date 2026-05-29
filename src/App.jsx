import { useState } from 'react'
import './App.css'

const GUMROAD_LINK = 'https://YOUR_GUMROAD_LINK_HERE'

const FEATURES = [
  { icon: '📄', label: 'Severance Analyzer' },
  { icon: '🏥', label: 'COBRA vs. ACA Comparison' },
  { icon: '🎯', label: 'Emergency Budget Mode' },
  { icon: '💼', label: 'Unemployment Estimator' },
  { icon: '✅', label: 'Day 1 Financial Checklist' },
]

function Tooltip({ text }) {
  const [visible, setVisible] = useState(false)
  return (
    <span
      className="tooltip-wrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={text}
    >
      <span className="tooltip-icon" aria-hidden="true">?</span>
      {visible && (
        <span className="tooltip-box" role="tooltip">
          {text}
        </span>
      )}
    </span>
  )
}

function NumberInput({ label, value, onChange, tooltip, placeholder }) {
  return (
    <div className="input-group">
      <label>
        <span className="label-text">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="input-wrap">
        <span className="input-prefix" aria-hidden="true">$</span>
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min="0"
          step="100"
          aria-label={label}
        />
      </div>
    </div>
  )
}

function getColor(months, hasInput) {
  if (!hasInput || months <= 0) return 'neutral'
  if (months >= 6) return 'green'
  if (months >= 3) return 'yellow'
  return 'red'
}

const COLOR_TOKENS = {
  green:   { text: '#16a34a', bg: 'rgba(22,163,74,0.07)',   border: 'rgba(22,163,74,0.18)',  badge: '#dcfce7', badgeText: '#15803d', label: 'Safe'     },
  yellow:  { text: '#b45309', bg: 'rgba(180,83,9,0.06)',    border: 'rgba(180,83,9,0.18)',   badge: '#fef3c7', badgeText: '#92400e', label: 'Caution'  },
  red:     { text: '#dc2626', bg: 'rgba(220,38,38,0.06)',   border: 'rgba(220,38,38,0.18)',  badge: '#fee2e2', badgeText: '#b91c1c', label: 'Critical' },
  neutral: { text: '#94a3b8', bg: 'rgba(148,163,184,0.05)', border: 'rgba(148,163,184,0.1)', badge: null,      badgeText: null,      label: ''         },
}

function RunwayDisplay({ months, label, size, hasInput }) {
  const color = getColor(months, hasInput)
  const c = COLOR_TOKENS[color]
  const display = hasInput && months > 0 ? months.toFixed(1) : '—'

  return (
    <div
      className={`runway-display runway-${size}`}
      style={{ background: c.bg, borderColor: c.border }}
    >
      <div className="runway-top">
        <span className="runway-number" style={{ color: c.text }}>
          {display}
        </span>
        {c.badge && (
          <span
            className="runway-badge"
            style={{ background: c.badge, color: c.badgeText }}
          >
            {c.label}
          </span>
        )}
      </div>
      <span className="runway-label">months {label}</span>
    </div>
  )
}

export default function App() {
  const [savings, setSavings]     = useState('')
  const [essentials, setEssentials] = useState('')
  const [variables, setVariables]   = useState('')

  const s = parseFloat(savings)    || 0
  const e = parseFloat(essentials) || 0
  const v = parseFloat(variables)  || 0

  const totalMonthly    = e + v
  const survivalMonthly = e + v * 0.5

  const runway         = totalMonthly    > 0 ? s / totalMonthly    : 0
  const survivalRunway = survivalMonthly > 0 ? s / survivalMonthly : 0
  const hasInput       = s > 0 && totalMonthly > 0

  return (
    <div className="app">
      <div className="container">

        {/* ── HEADER ── */}
        <header>
          <span className="eyebrow">Free Tool</span>
          <h1>Layoff Runway<br />Calculator</h1>
          <p className="subtitle">
            Know exactly how long your savings will last — in normal mode
            and survival mode.
          </p>
        </header>

        {/* ── CALCULATOR CARD ── */}
        <main className="card" aria-label="Runway calculator">

          <div className="inputs" aria-label="Financial inputs">
            <NumberInput
              label="Current savings"
              value={savings}
              onChange={setSavings}
              placeholder="25000"
            />
            <NumberInput
              label="Monthly essential expenses"
              value={essentials}
              onChange={setEssentials}
              tooltip="rent, utilities, insurance, debt minimums"
              placeholder="2400"
            />
            <NumberInput
              label="Monthly variable expenses"
              value={variables}
              onChange={setVariables}
              tooltip="food, transport, subscriptions, dining out"
              placeholder="1200"
            />
          </div>

          <div className="divider" aria-hidden="true">
            <span>your runway</span>
          </div>

          <div className="outputs" aria-live="polite" aria-label="Calculated results">
            {!hasInput && (
              <div className="placeholder" aria-label="Enter values above to see your runway">
                Enter your numbers above
              </div>
            )}
            {(hasInput || true) && (
              <>
                <RunwayDisplay
                  months={runway}
                  label="of runway"
                  size="large"
                  hasInput={hasInput}
                />
                <RunwayDisplay
                  months={survivalRunway}
                  label="in survival mode — 50% variable cuts"
                  size="small"
                  hasInput={hasInput}
                />
              </>
            )}
          </div>

        </main>

        {/* ── CTA CARD ── */}
        <aside className="cta-card" aria-label="Upgrade to the full kit">
          <div className="cta-header">
            <p className="cta-eyebrow">Want the full picture?</p>
            <h2>Layoff Survival<br />Financial Kit</h2>
          </div>

          <ul className="features" aria-label="Included features">
            {FEATURES.map(f => (
              <li key={f.label}>
                <span className="feature-icon" aria-hidden="true">{f.icon}</span>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          <a
            href={GUMROAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="Get the Full Kit for $34 — opens Gumroad"
          >
            Get the Full Kit — $34
            <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
        </aside>

        <footer>
          <p>Estimates only. Consult a financial advisor for personalized guidance.</p>
        </footer>

      </div>
    </div>
  )
}
