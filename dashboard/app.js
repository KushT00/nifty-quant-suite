/**
 * Nifty Quant Suite — Dashboard Application Logic
 * ================================================
 * Drives the interactive portfolio analytics dashboard with:
 * - Strategy tab switching with animated metric transitions
 * - Chart.js equity curve rendering with gradient fills
 * - Exit reason breakdowns with colored dot indicators
 * - Monthly P&L heatmap population
 * - Dual-audience explainer toggle (Engineers vs Traders)
 */

// ============================================================
// 1. STRATEGY DATA (Demo metrics for each strategy)
// ============================================================
const STRATEGIES = {
    buying: {
        name: "Option Buying — Triple Confirm",
        tag: "Buying",
        tagClass: "tag-buying",
        metrics: {
            pnl: "+₹47,820",
            pnlClass: "val-profit",
            pnlSub: "Nifty CE/PE weekly options (₹200 target premium)",
            winRate: "42.5%",
            winRateClass: "val-info",
            winRateSub: "40 wins / 94 trades",
            pf: "1.84",
            dd: "₹8,240",
            ddSub: "12.6% of peak equity",
            sharpe: "1.72",
            sortino: "2.38",
            calmar: "3.21"
        },
        exitReasons: [
            { label: "Trail Exit (Profit)", value: 34, color: "#10b981" },
            { label: "Initial SL Exit", value: 48, color: "#ef4444" },
            { label: "Smart Re-Entry Exit", value: 12, color: "#6366f1" }
        ],
        equityCurve: generateCurve(94, 50000, 97820, 0.42),
        heatmap: {
            2024: [3200, -1400, 5600, 2100, -800, 4300, -2100, 6700, 1900, 3400, -500, 2800],
            2025: [4100, 2300, -1200, 5800, 3200, -900, 4500, 1800, 6200, -1600, 3900, 2100],
            2026: [5200, 3100, 4800, -700, 2600, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    selling: {
        name: "Option Selling — Weekly Master",
        tag: "Selling",
        tagClass: "tag-selling",
        metrics: {
            pnl: "+₹1,24,600",
            pnlClass: "val-profit",
            pnlSub: "Multi-leg spreads (IC, Batman, Ratio) on Nifty weekly options",
            winRate: "68.2%",
            winRateClass: "val-info",
            winRateSub: "92 wins / 135 slots deployed",
            pf: "2.14",
            dd: "₹18,400",
            ddSub: "9.2% of capital deployed",
            sharpe: "2.05",
            sortino: "3.12",
            calmar: "4.58"
        },
        exitReasons: [
            { label: "Theta Decay (Full)", value: 58, color: "#10b981" },
            { label: "Premium SL Hit", value: 24, color: "#ef4444" },
            { label: "ITM Breach Exit", value: 12, color: "#f59e0b" },
            { label: "Intraday Squareoff", value: 18, color: "#6366f1" },
            { label: "Weekly Circuit Breaker", value: 2, color: "#ef4444" },
            { label: "Expiry Force Close", value: 21, color: "#06b6d4" }
        ],
        equityCurve: generateCurve(135, 200000, 324600, 0.68),
        heatmap: {
            2024: [8400, 12100, -3200, 15600, 9800, -1400, 11200, 7600, 14300, -4200, 10500, 8900],
            2025: [13200, 9600, 11800, -2400, 14500, 8200, -1800, 16400, 10100, 12700, -3600, 11200],
            2026: [15800, 11400, 9200, -1600, 8400, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    simulation: {
        name: "BS Simulation — Supertrend Engine",
        tag: "Simulation",
        tagClass: "tag-simulation",
        metrics: {
            pnl: "+₹38,450",
            pnlClass: "val-profit",
            pnlSub: "Black-Scholes simulated CE premiums (2022–Present)",
            winRate: "38.7%",
            winRateClass: "val-info",
            winRateSub: "89 wins / 230 trades",
            pf: "1.62",
            dd: "₹12,800",
            ddSub: "14.4% of peak equity | 42 calendar days",
            sharpe: "1.45",
            sortino: "1.98",
            calmar: "2.16"
        },
        exitReasons: [
            { label: "Stop Loss", value: 98, color: "#ef4444" },
            { label: "Take Profit", value: 52, color: "#10b981" },
            { label: "Reversal Exit", value: 44, color: "#f59e0b" },
            { label: "Intraday Squareoff", value: 36, color: "#6366f1" }
        ],
        equityCurve: generateCurve(230, 50000, 88450, 0.387),
        heatmap: {
            2022: [-2100, 3400, 1800, -4200, 5600, 2100, -1300, 4800, -900, 3200, 1500, -2400],
            2023: [4200, -1800, 5100, 2600, -3400, 6200, 1400, -2100, 4800, 3100, -1600, 5400],
            2024: [3800, 2200, -1400, 4600, 1800, -800, 3200, 5400, -2600, 4100, 2800, -1200],
            2025: [5200, 3600, 1400, -2800, 4200, -1100, 3800, 2600, 5800, -900, 3400, 1800],
            2026: [4100, 2800, 3200, -600, 1900, 0, 0, 0, 0, 0, 0, 0]
        }
    }
};

// ============================================================
// 2. EQUITY CURVE GENERATOR
// ============================================================
function generateCurve(trades, startCap, endCap, winRate) {
    const curve = [startCap];
    const totalPnl = endCap - startCap;
    const avgWin = (totalPnl * 2.2) / (trades * winRate);
    const avgLoss = (totalPnl * 1.2) / (trades * (1 - winRate));

    for (let i = 1; i <= trades; i++) {
        const isWin = Math.random() < winRate;
        const variation = 0.5 + Math.random();
        const change = isWin
            ? avgWin * variation
            : -Math.abs(avgLoss) * variation;
        curve.push(Math.max(curve[i - 1] + change, startCap * 0.7));
    }

    // Normalize endpoint
    const currentEnd = curve[curve.length - 1];
    const scale = (endCap - startCap) / (currentEnd - startCap);
    return curve.map((v, i) => i === 0 ? startCap : startCap + (v - startCap) * scale);
}

// ============================================================
// 3. CHART INSTANCE
// ============================================================
let equityChartInstance = null;

function renderEquityCurve(data, strategyKey) {
    const ctx = document.getElementById('equityChart').getContext('2d');
    const colors = {
        buying: { line: '#10b981', fillTop: 'rgba(16,185,129,0.25)', fillBot: 'rgba(16,185,129,0.0)' },
        selling: { line: '#6366f1', fillTop: 'rgba(99,102,241,0.25)', fillBot: 'rgba(99,102,241,0.0)' },
        simulation: { line: '#06b6d4', fillTop: 'rgba(6,182,212,0.25)', fillBot: 'rgba(6,182,212,0.0)' }
    };
    const c = colors[strategyKey];

    if (equityChartInstance) equityChartInstance.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 340);
    gradient.addColorStop(0, c.fillTop);
    gradient.addColorStop(1, c.fillBot);

    equityChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i === 0 ? 'Start' : `T${i}`),
            datasets: [{
                label: 'Account Equity (₹)',
                data: data,
                borderColor: c.line,
                borderWidth: 2,
                backgroundColor: gradient,
                fill: true,
                tension: 0.25,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: c.line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#94a3b8',
                    bodyColor: '#f1f5f9',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: ctx => '₹' + Number(ctx.parsed.y).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.02)' },
                    ticks: { color: '#475569', font: { family: 'Inter', size: 10 }, maxTicksLimit: 12 }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    ticks: {
                        color: '#475569',
                        font: { family: 'Inter', size: 10 },
                        callback: v => '₹' + (v / 1000).toFixed(0) + 'k'
                    }
                }
            }
        }
    });
}

// ============================================================
// 4. UI POPULATION FUNCTIONS
// ============================================================
function populateMetrics(strategy) {
    const m = strategy.metrics;
    document.getElementById('metricPnl').textContent = m.pnl;
    document.getElementById('metricPnl').className = `card-value ${m.pnlClass}`;
    document.getElementById('metricPnlSub').textContent = m.pnlSub;

    document.getElementById('metricWinRate').textContent = m.winRate;
    document.getElementById('metricWinRate').className = `card-value ${m.winRateClass}`;
    document.getElementById('metricWinRateSub').textContent = m.winRateSub;

    document.getElementById('metricPF').textContent = m.pf;
    document.getElementById('metricDD').textContent = m.dd;
    document.getElementById('metricDDSub').textContent = m.ddSub;

    document.getElementById('metricSharpe').textContent = m.sharpe;
    document.getElementById('metricSortino').textContent = m.sortino;
    document.getElementById('metricCalmar').textContent = m.calmar;

    // Update curve tag
    document.getElementById('curveTag').textContent = strategy.tag;
    document.getElementById('curveTag').className = `tag ${strategy.tagClass}`;
}

function populateExitBreakdown(exitReasons) {
    const container = document.getElementById('exitBreakdown');
    const total = exitReasons.reduce((s, r) => s + r.value, 0);
    container.innerHTML = exitReasons.map(r => `
        <div class="metric-row">
            <span class="metric-label">
                <span class="dot-indicator" style="background:${r.color};"></span>
                ${r.label}
            </span>
            <span class="metric-val" style="color:${r.color};">${r.value} <span style="color:var(--text-tertiary);font-weight:400;font-size:0.75rem;">(${((r.value/total)*100).toFixed(0)}%)</span></span>
        </div>
    `).join('');
}

function populateHeatmap(heatmap) {
    const body = document.getElementById('heatmapBody');
    body.innerHTML = '';

    const years = Object.keys(heatmap).sort();
    for (const year of years) {
        const row = heatmap[year];
        const total = row.reduce((s, v) => s + v, 0);
        const cells = row.map(v => {
            if (v > 0) return `<td class="heatmap-cell-pos">+₹${(v/1000).toFixed(1)}k</td>`;
            if (v < 0) return `<td class="heatmap-cell-neg">-₹${(Math.abs(v)/1000).toFixed(1)}k</td>`;
            return `<td class="heatmap-cell-zero">—</td>`;
        }).join('');

        const totalClass = total >= 0 ? 'heatmap-cell-pos' : 'heatmap-cell-neg';
        const totalSign = total >= 0 ? '+' : '-';

        body.innerHTML += `
            <tr>
                <td style="text-align:left;font-weight:800;color:#60a5fa;">${year}</td>
                ${cells}
                <td class="${totalClass}" style="font-weight:800;">${totalSign}₹${(Math.abs(total)/1000).toFixed(1)}k</td>
            </tr>
        `;
    }
}

// ============================================================
// 5. TAB SWITCHING
// ============================================================
function switchStrategy(key) {
    const strategy = STRATEGIES[key];
    if (!strategy) return;

    // Update tab active state
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.strategy === key);
    });

    // Populate all sections
    populateMetrics(strategy);
    populateExitBreakdown(strategy.exitReasons);
    renderEquityCurve(strategy.equityCurve, key);
    populateHeatmap(strategy.heatmap);
}

// ============================================================
// 6. EXPLAINER TOGGLE
// ============================================================
function initExplainerTabs() {
    document.querySelectorAll('.explainer-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.explainer-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.explainer-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });
}

// ============================================================
// 7. INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Strategy tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchStrategy(btn.dataset.strategy));
    });

    // Explainer tabs
    initExplainerTabs();

    // Default view
    switchStrategy('buying');
});
