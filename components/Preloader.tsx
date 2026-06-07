"use client";

export default function Preloader({ exiting = false }: { exiting?: boolean }) {
  return (
    <div className={`pl-overlay${exiting ? " pl-exit" : ""}`} role="status" aria-label="Chargement du portfolio">

      {/* ── Grille de fond ── */}
      <div className="pl-bg-grid" aria-hidden="true" />

      {/* ── Scène principale ── */}
      <div className="pl-scene" aria-hidden="true">

        {/* Panneau AI — colonne gauche, rangée 1 */}
        <div className="pl-card pl-card-ai">
          <div className="pl-card-header">
            <span className="pl-ai-badge">AI</span>
          </div>
          <div className="pl-node-graph">
            <span className="pl-ng-node" />
            <span className="pl-ng-edge" />
            <span className="pl-ng-node pl-ng-accent" />
            <span className="pl-ng-edge" />
            <span className="pl-ng-node" />
          </div>
        </div>

        {/* Panneau Flowchart — colonne gauche, rangée 2 */}
        <div className="pl-card pl-card-flow">
          <div className="pl-flow-node" />
          <div className="pl-flow-vline" />
          <div className="pl-flow-node" />
          <div className="pl-flow-vline" />
          <div className="pl-flow-diamond" />
          <div className="pl-flow-fork">
            <span className="pl-fork-left" />
            <span className="pl-fork-right" />
          </div>
        </div>

        {/* ── Workspace central ── */}
        <div className="pl-workspace">

          {/* Grand moniteur (code) */}
          <div className="pl-monitor">
            <div className="pl-monitor-bar">
              <span className="pl-wdot r" />
              <span className="pl-wdot y" />
              <span className="pl-wdot g" />
            </div>
            <div className="pl-monitor-screen">
              <div className="pl-cl cl1" />
              <div className="pl-cl cl2 c" />
              <div className="pl-cl cl3 p" />
              <div className="pl-cl cl4" />
              <div className="pl-cl cl5 o" />
              <div className="pl-cl cl6 c" />
              <div className="pl-cl cl7 p" />
              <div className="pl-cl cl8" />
              <div className="pl-cl cl9 o" />
              <div className="pl-cursor-blink" />
            </div>
            <div className="pl-monitor-neck" />
            <div className="pl-monitor-foot" />
          </div>

          {/* Petit moniteur (charts) */}
          <div className="pl-monitor-sm">
            <div className="pl-monitor-screen pl-sm-screen">
              <div className="pl-chart-bars">
                <div className="pl-b b1" />
                <div className="pl-b b2 a" />
                <div className="pl-b b3" />
                <div className="pl-b b4 a" />
                <div className="pl-b b5" />
              </div>
              <div className="pl-chart-line-svg">
                <svg viewBox="0 0 80 30" preserveAspectRatio="none">
                  <polyline
                    points="0,22 16,18 32,12 48,16 64,8 80,10"
                    fill="none"
                    stroke="rgba(0,212,255,0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="pl-monitor-neck sm" />
          </div>

          {/* Silhouette développeur */}
          <svg className="pl-person-svg" viewBox="0 0 120 95" xmlns="http://www.w3.org/2000/svg">
            {/* Fauteuil */}
            <rect x="33" y="66" width="54" height="5" rx="2.5" fill="#1e293b" />
            <rect x="40" y="71" width="5" height="20" rx="2.5" fill="#1e293b" />
            <rect x="75" y="71" width="5" height="20" rx="2.5" fill="#1e293b" />
            <rect x="30" y="89" width="60" height="5" rx="2.5" fill="#1e293b" />
            {/* Corps */}
            <rect x="41" y="48" width="38" height="22" rx="5" fill="#3b82f6" />
            {/* Tête */}
            <circle cx="60" cy="38" r="13" fill="#fbbf24" />
            {/* Cheveux */}
            <path d="M47 35 Q60 25 73 35 Q70 30 60 29 Q50 30 47 35Z" fill="#1e293b" />
            {/* Bras gauche */}
            <rect x="20" y="50" width="23" height="6" rx="3" fill="#3b82f6" />
            {/* Bras droit */}
            <rect x="77" y="50" width="23" height="6" rx="3" fill="#3b82f6" />
            {/* Laptop couvercle */}
            <rect x="30" y="61" width="60" height="6" rx="2" fill="#334155" />
            <rect x="33" y="63" width="54" height="3" rx="1" fill="#0d1b2e" />
            {/* Laptop base */}
            <rect x="28" y="66" width="64" height="4" rx="2" fill="#475569" />
          </svg>

          {/* Bureau */}
          <div className="pl-desk" />
        </div>

        {/* Panneau Dashboard — colonne droite, rangée 1 */}
        <div className="pl-card pl-card-dash">
          <div className="pl-dash-tiles">
            <span className="pl-tile pl-tile-accent" />
            <span className="pl-tile" />
            <span className="pl-tile" />
            <span className="pl-tile pl-tile-accent sm" />
          </div>
        </div>

        {/* Panneau Data — colonne droite, rangée 2 */}
        <div className="pl-card pl-card-data">
          <div className="pl-mini-bars">
            <div className="pl-mb mb1" />
            <div className="pl-mb mb2 a" />
            <div className="pl-mb mb3" />
            <div className="pl-mb mb4 a" />
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="pl-footer" aria-hidden="true">
        <div className="pl-brand">
          <span className="pl-br">&lt;</span>
          <span className="pl-brand-name">DIOMANDE DROH MARTIAL</span>
          <span className="pl-br">/&gt;</span>
        </div>
        <p className="pl-status-text">
          Initialisation du portfolio
          <span className="pl-typing-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
        <div className="pl-progress-track">
          <div className="pl-progress-fill" />
          <div className="pl-progress-glow" />
        </div>
      </div>

    </div>
  );
}
