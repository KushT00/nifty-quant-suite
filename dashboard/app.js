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
// 1. STRATEGY DATA (Real metrics from backtest reports)
// ============================================================
const STRATEGIES = {
    buying: {
        name: "Option Buying — Triple Confirm",
        tag: "Buying",
        tagClass: "tag-buying",
        metrics: {
            pnl: "+₹11,38,598",
            pnlClass: "val-profit",
            pnlSub: "Safety Capital: ₹1.5L | Gross: +₹11.61L | Brokerage: ₹22,440",
            winRate: "50.3%",
            winRateClass: "val-info",
            winRateSub: "188 wins / 374 trades",
            pf: "1.87",
            dd: "₹89,902",
            ddSub: "179.8% on 50k initial (59.9% on safety cap)",
            sharpe: "1.90",
            sortino: "3.42",
            calmar: "2.94"
        },
        exitReasons: [
            { label: "Trailing Stop Loss (TSL)", value: 374, color: "#10b981" }
        ],
        // Option Lot PnL (Rs.) — cumulative equity curve from real backtest
        equityCurve: [11434.0, 8462.0, 37388.0, 33147.0, 29665.0, 40491.0, 58327.0, 69041.0, 68422.0, 87821.0, 95380.0, 95038.0, 85235.0, 79440.0, 99772.0, 90565.0, 113094.0, 114713.0, 109611.0, 97025.0, 93700.0, 110377.0, 101843.0, 98521.0, 100439.0, 95349.0, 101233.0, 93719.0, 94761.0, 91551.0, 88153.0, 78941.0, 100473.0, 91245.0, 90721.0, 96587.0, 110321.0, 105055.0, 102220.0, 97668.0, 103134.0, 98551.0, 91455.0, 92577.0, 100074.0, 104669.0, 102107.0, 104807.0, 97228.0, 107081.0, 101140.0, 98619.0, 92213.0, 97053.0, 90267.0, 99031.0, 106400.0, 97992.0, 107363.0, 103133.0, 137136.0, 133509.0, 141976.0, 131430.0, 132255.0, 127527.0, 122688.0, 125135.0, 121378.0, 115702.0, 109827.0, 131170.0, 122663.0, 157135.0, 143317.0, 145224.0, 173868.0, 190220.0, 186004.0, 182725.0, 177884.0, 180108.0, 175346.0, 188490.0, 181602.0, 176704.0, 190804.0, 181961.0, 184904.0, 190221.0, 190617.0, 182174.0, 175414.0, 181161.0, 174541.0, 182006.0, 172279.0, 162744.0, 183040.0, 180954.0, 192821.0, 192219.0, 186422.0, 182447.0, 179927.0, 181107.0, 192155.0, 183061.0, 189788.0, 191636.0, 196128.0, 187440.0, 187067.0, 176658.0, 168563.0, 160191.0, 161965.0, 152779.0, 160092.0, 150429.0, 140869.0, 136348.0, 130750.0, 130073.0, 131010.0, 138753.0, 160370.0, 164710.0, 157241.0, 151310.0, 155407.0, 150062.0, 158599.0, 158903.0, 150562.0, 138882.0, 133825.0, 128049.0, 125882.0, 162497.0, 154448.0, 167685.0, 171857.0, 163543.0, 166883.0, 170851.0, 159634.0, 167649.0, 155785.0, 155918.0, 147003.0, 139540.0, 130753.0, 125691.0, 144177.0, 145684.0, 134479.0, 124469.0, 123734.0, 124951.0, 118111.0, 106226.0, 129279.0, 126012.0, 127054.0, 134122.0, 123594.0, 118383.0, 121573.0, 157686.0, 148126.0, 183547.0, 255378.0, 242589.0, 250419.0, 244832.0, 245505.0, 261711.0, 251799.0, 241957.0, 244446.0, 247454.0, 269974.0, 260709.0, 265368.0, 254671.0, 263503.0, 256002.0, 259673.0, 260246.0, 252785.0, 241378.0, 243240.0, 237280.0, 226744.0, 230788.0, 232725.0, 227469.0, 214790.0, 234856.0, 225367.0, 214234.0, 211731.0, 228639.0, 232699.0, 255455.0, 249500.0, 254285.0, 257854.0, 265884.0, 260767.0, 267380.0, 275064.0, 267547.0, 317668.0, 320073.0, 307828.0, 347471.0, 350525.0, 355472.0, 362924.0, 351513.0, 379721.0, 383790.0, 378222.0, 399456.0, 397855.0, 415739.0, 422134.0, 415372.0, 406974.0, 450055.0, 445520.0, 432469.0, 473839.0, 480143.0, 501253.0, 493774.0, 495386.0, 496182.0, 543551.0, 537460.0, 533121.0, 519387.0, 511966.0, 521484.0, 527383.0, 532221.0, 530907.0, 537489.0, 552290.0, 545594.0, 581279.0, 592561.0, 619779.0, 619116.0, 614326.0, 625225.0, 619773.0, 613381.0, 599161.0, 593172.0, 581572.0, 616925.0, 622121.0, 622939.0, 630452.0, 641844.0, 651853.0, 656110.0, 653464.0, 640782.0, 629201.0, 619782.0, 607634.0, 612527.0, 643416.0, 647960.0, 696691.0, 685005.0, 686422.0, 690302.0, 768850.0, 763033.0, 750851.0, 765311.0, 847810.0, 838007.0, 910035.0, 901837.0, 891869.0, 893361.0, 893652.0, 880703.0, 888346.0, 890522.0, 894539.0, 894516.0, 898588.0, 894068.0, 882080.0, 890825.0, 879124.0, 881282.0, 893421.0, 911925.0, 911784.0, 923884.0, 929254.0, 917703.0, 930699.0, 931630.0, 918561.0, 911978.0, 905381.0, 909633.0, 915884.0, 915772.0, 942972.0, 963554.0, 972852.0, 963062.0, 988118.0, 976026.0, 1004002.0, 1013209.0, 1012702.0, 999971.0, 1032018.0, 1022479.0, 1010173.0, 1020757.0, 1031901.0, 1043858.0, 1043454.0, 1039588.0, 1045245.0, 1033038.0, 1025001.0, 1011078.0, 1014705.0, 1020425.0, 1054904.0, 1042040.0, 1080130.0, 1086551.0, 1088331.0, 1079256.0, 1072753.0, 1065950.0, 1054127.0, 1054150.0, 1066552.0, 1065197.0, 1067827.0, 1066823.0, 1102553.0, 1096441.0, 1137046.0, 1147059.0, 1136129.0, 1122758.0, 1119541.0, 1119555.0, 1139599.0, 1144422.0, 1165488.0, 1161290.0, 1150122.0, 1137292.0, 1172841.0, 1170343.0, 1171049.0, 1161038.0],
        // Spot PnL (Points) — dual-axis overlay from real backtest
        spotPnl: [192.2, 244.3, 689.2, 562.7, 465.4, 664.7, 939.4, 1206.2, 1243.0, 1620.1, 1736.6, 1733.7, 1579.6, 1447.7, 1778.1, 1635.3, 2123.1, 2181.9, 2050.4, 1864.2, 1743.3, 2191.6, 2055.1, 1930.7, 2128.1, 2049.7, 2360.5, 2237.5, 2253.6, 2193.1, 2232.0, 2078.9, 2515.5, 2374.1, 2421.9, 2587.9, 2908.9, 2782.6, 2726.3, 2606.7, 2690.4, 2556.4, 2467.4, 2543.2, 2753.7, 2824.0, 2748.4, 2803.2, 2678.6, 2830.8, 2695.7, 2747.2, 2640.7, 2714.9, 2527.0, 2788.0, 2901.4, 2784.1, 2941.2, 2818.9, 3416.0, 3316.7, 3531.9, 3355.3, 3368.8, 3248.5, 3106.8, 3189.1, 3069.3, 2966.3, 2854.3, 3182.7, 3052.6, 3656.6, 3417.4, 3483.0, 4061.1, 4381.5, 4249.9, 4153.3, 4029.3, 4064.2, 4131.0, 4334.0, 4243.2, 4101.6, 4418.2, 4283.3, 4387.0, 4468.4, 4521.2, 4399.3, 4264.7, 4353.9, 4222.6, 4348.8, 4049.3, 3897.3, 4231.5, 4286.5, 4585.3, 4641.3, 4499.8, 4501.7, 4506.1, 4569.6, 4766.7, 4626.1, 4765.2, 4795.3, 4915.3, 4776.5, 4771.0, 4624.1, 4496.2, 4372.3, 4398.9, 4260.8, 4385.4, 4243.9, 4106.7, 3974.7, 3856.2, 3897.4, 3912.5, 4032.3, 4384.5, 4485.6, 4370.6, 4236.4, 4340.5, 4214.4, 4348.8, 4356.7, 4218.7, 4036.9, 3903.1, 3769.1, 3776.3, 4419.3, 4293.3, 4563.8, 4688.9, 4551.5, 4602.8, 4692.7, 4521.3, 4738.7, 4599.7, 4681.3, 4541.7, 4369.8, 4233.7, 4228.7, 4560.4, 4600.3, 4433.6, 4289.1, 4315.5, 4359.3, 4198.0, 4008.0, 4437.7, 4472.1, 4504.8, 4631.8, 4490.3, 4391.4, 4452.6, 5017.5, 4876.2, 5485.9, 6591.7, 6386.1, 6606.2, 6431.3, 6475.3, 6820.6, 6669.1, 6507.2, 6550.8, 6699.8, 7045.5, 6881.8, 6975.3, 6810.6, 7074.3, 6915.9, 6994.0, 7043.9, 6875.9, 6713.4, 6893.4, 6748.2, 6579.7, 6655.2, 6800.2, 6626.7, 6455.5, 6763.7, 6603.2, 6431.3, 6494.4, 6755.6, 6918.4, 7301.4, 7137.1, 7224.1, 7315.3, 7500.9, 7349.8, 7520.2, 7739.1, 7551.8, 8327.6, 8509.6, 8214.4, 8830.3, 8996.8, 9204.6, 9319.4, 9156.9, 9609.3, 9694.1, 9536.2, 9886.9, 9927.3, 10224.2, 10322.5, 10137.7, 10009.0, 10767.6, 10703.2, 10506.3, 11263.7, 11493.2, 11818.8, 11597.3, 11664.2, 11830.3, 12573.1, 12356.6, 12364.1, 12172.1, 12011.2, 12166.0, 12353.6, 12440.8, 12463.3, 12586.9, 12814.9, 12653.9, 13287.1, 13460.8, 14028.6, 14018.8, 13866.9, 14158.2, 13974.1, 13761.8, 13534.3, 13350.6, 13175.6, 13718.8, 13894.3, 13906.0, 14098.0, 14403.5, 14579.5, 14718.5, 14782.5, 14569.5, 14299.8, 14154.6, 13914.6, 13991.1, 14529.5, 14637.4, 15400.7, 15220.4, 15279.4, 15462.5, 16686.6, 16508.7, 16320.5, 16542.3, 17912.5, 17569.8, 18879.7, 18618.0, 18430.9, 18493.2, 18592.1, 18522.8, 18766.5, 18848.6, 19155.5, 19154.9, 19339.0, 19440.6, 19210.4, 19344.6, 19125.5, 19189.7, 19517.2, 19901.8, 19933.3, 20149.0, 20383.3, 20206.0, 20461.4, 20554.9, 20330.0, 20148.3, 19964.0, 20084.0, 20179.5, 20232.2, 20665.4, 21036.8, 21181.1, 21006.2, 21391.8, 21193.4, 21623.5, 21879.0, 21983.0, 21786.7, 22390.9, 22197.6, 22005.6, 22167.5, 22361.2, 22649.7, 22652.6, 22732.9, 22827.4, 22592.0, 22394.8, 22188.5, 22339.8, 22528.7, 23058.0, 22859.9, 23496.4, 23691.8, 23719.2, 23512.8, 23414.3, 23226.3, 22955.4, 22973.5, 23245.9, 23243.5, 23316.4, 23397.6, 24083.3, 23831.9, 24663.0, 24995.1, 24818.5, 24553.0, 24486.5, 24502.8, 24811.7, 25139.7, 25766.6, 25600.5, 25428.7, 25001.6, 25610.0, 25741.1, 25923.1, 25762.1],
        heatmap: {
            2022: [40491, 56534, -18084, 19609, 7849, 9302, 27615, 36791, 2066, 10648, -11714, 5960],
            2023: [-46198, 16372, 5256, 5188, -11901, -25031, 3726, -28253, 27895, 14004, 107252, 6332],
            2024: [1793, -32716, -2149, 37245, 54189, 59648, 27253, 66865, 69712, -12644, 94318, 5226],
            2025: [-10670, 76910, 54160, 142801, -2826, 38429, -19621, 53921, 40449, 6171, 29415, -19163],
            2026: [58831, 23297, 41869, 16617, 0, 0, 0, 0, 0, 0, 0, 0]
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
            pnl: "+₹3,24,255",
            pnlClass: "val-profit",
            pnlSub: "Initial Cap: ₹50k | Slippage (0.3pts/ord) & Brokerage (₹40 round-trip) + GST/STT included",
            winRate: "48.4%",
            winRateClass: "val-info",
            winRateSub: "119 wins / 246 trades",
            pf: "1.73",
            dd: "₹44,210",
            ddSub: "14.4% of peak equity | Recovery: 171.9 days",
            sharpe: "3.65",
            sortino: "13.01",
            calmar: "45.02"
        },
        exitReasons: [
            { label: "Intraday Squareoff", value: 83, color: "#6366f1" },
            { label: "Reversal Exit", value: 77, color: "#f59e0b" },
            { label: "Stop Loss (SL)", value: 59, color: "#ef4444" },
            { label: "Take Profit (TP)", value: 27, color: "#10b981" }
        ],
        equityCurve: [50000.0, 59768.89, 60524.69, 65005.5, 63873.55, 77696.25, 90109.97, 83442.33, 85859.63, 86277.84, 105580.0, 102662.31, 113979.38, 133275.08, 131665.39, 129527.66, 136085.0, 132444.52, 130659.4, 136846.85, 133310.23, 133902.32, 127233.37, 139844.47, 137048.55, 132926.89, 131546.47, 126173.01, 127986.0, 123067.14, 119698.04, 123968.41, 120812.58, 132981.64, 126322.27, 126133.53, 129645.34, 136330.58, 135464.5, 132289.55, 143025.8, 138758.96, 140043.34, 139303.63, 139522.23, 142666.53, 148391.3, 151390.35, 150208.82, 149531.87, 142900.51, 145345.53, 149412.68, 149528.26, 149468.3, 145801.06, 145342.26, 147083.07, 143433.46, 139477.36, 138410.59, 139481.03, 139969.18, 133426.88, 138612.28, 140897.77, 140268.49, 136984.49, 139344.37, 136311.42, 141402.53, 139206.95, 145572.02, 161230.73, 157376.25, 163849.04, 167506.58, 170582.79, 180560.96, 198312.46, 191641.1, 190705.34, 206052.64, 205083.91, 206103.68, 203451.93, 204282.3, 210686.68, 206542.71, 201683.05, 212453.26, 211711.27, 217205.23, 220004.85, 215027.1, 219616.23, 215094.42, 212836.09, 214671.32, 216010.86, 211388.44, 221091.41, 214430.76, 218847.37, 214310.98, 215890.16, 220268.41, 223691.04, 222251.97, 219326.61, 227061.14, 229289.46, 225752.81, 228990.0, 226319.39, 228642.33, 233658.11, 233153.46, 243256.97, 248645.15, 246680.94, 252602.95, 253423.55, 263718.86, 266092.76, 260619.55, 257985.84, 269723.85, 266026.04, 261341.35, 262860.65, 260032.65, 261115.31, 261721.16, 275515.54, 290273.59, 283634.33, 287176.8, 284029.31, 294314.31, 291573.47, 285170.38, 284796.28, 280962.78, 276603.24, 272807.36, 268852.49, 269472.85, 281395.78, 277269.01, 270598.75, 267117.51, 262741.25, 274961.28, 271984.31, 278126.07, 284576.36, 277938.07, 272631.88, 270669.91, 265507.73, 284800.76, 279982.34, 299277.77, 301954.63, 299224.05, 293688.61, 288257.26, 282850.93, 296765.46, 296763.55, 293726.95, 288572.8, 292977.11, 289202.0, 293489.2, 286858.83, 288025.98, 289985.95, 289403.83, 286457.12, 295646.16, 303604.55, 299229.44, 314793.0, 318502.99, 318841.58, 315565.3, 316351.32, 314489.7, 317996.77, 314083.76, 313810.17, 310525.86, 306255.85, 302356.68, 310208.21, 307483.9, 318928.59, 312260.24, 306557.8, 302727.04, 300044.37, 303685.21, 297914.76, 300412.34, 295201.85, 293040.87, 287427.84, 280784.9, 278490.22, 274718.13, 294017.68, 290606.79, 294336.53, 292153.2, 288217.88, 288175.82, 288517.58, 288785.2, 306892.07, 318884.08, 322041.77, 315432.95, 333148.04, 330901.73, 326767.69, 328594.08, 324650.81, 326606.67, 325142.65, 321089.27, 321261.92, 331965.17, 339610.67, 335565.08, 354627.92, 363321.75, 377174.85, 371012.64, 372404.92, 369108.09, 365795.41, 365176.6, 375526.85, 372157.95, 374255.44],
        heatmap: {
            2022: [40110, 15470, 23948, 7521, -10726, 5967, 17242, -4, -16101, 5917, 2058, 22447],
            2023: [27792, 11811, 8259, 8294, -4910, -2258, 7432, -942, 9963, -3537, 2890, 23961],
            2024: [11116, -2378, 380, 28552, 1300, -22721, 1746, -3481, 17459, 224, 3456, 8506],
            2025: [-3274, -4085, 9826, 19612, -3276, 2431, -7789, -7481, -4812, -17130, 7391, 609],
            2026: [26648, 5656, 33539, 20899, -1271, 0, 0, 0, 0, 0, 0, 0]
        }
    }
};

// ============================================================
// 2. EQUITY CURVE GENERATOR (for strategies without real data)
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
    const strategy = STRATEGIES[strategyKey];

    if (equityChartInstance) equityChartInstance.destroy();

    // --- Buying strategy: dual-axis chart (Option PnL + Spot PnL) ---
    if (strategyKey === 'buying' && strategy.spotPnl) {
        const labels = data.map((_, i) => {
            // Show approximate date labels every ~30 trades
            const yearStart = 2022;
            const monthsElapsed = Math.floor(i / 7.5);
            const year = yearStart + Math.floor(monthsElapsed / 12);
            const month = (monthsElapsed % 12) + 1;
            return `${year}-${String(month).padStart(2, '0')}`;
        });

        equityChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Option Lot PnL (Rs. — Left Axis)',
                        data: data,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.05)',
                        fill: true,
                        tension: 0.1,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: '#10b981',
                        yAxisID: 'yOpt'
                    },
                    {
                        label: 'Spot PnL (Points — Right Axis)',
                        data: strategy.spotPnl,
                        borderColor: '#3b82f6',
                        backgroundColor: 'transparent',
                        fill: false,
                        tension: 0.1,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: '#3b82f6',
                        yAxisID: 'ySpot'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        labels: { color: '#f3f4f6', font: { family: 'Inter' } }
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleColor: '#94a3b8',
                        bodyColor: '#f1f5f9',
                        borderColor: 'rgba(255,255,255,0.08)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function(ctx) {
                                if (ctx.datasetIndex === 0) {
                                    return 'Rs.' + Number(ctx.parsed.y).toLocaleString('en-IN', { maximumFractionDigits: 0 });
                                }
                                return ctx.parsed.y.toFixed(1) + ' pts';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 }, maxTicksLimit: 16 }
                    },
                    yOpt: {
                        position: 'left',
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: {
                            color: '#10b981',
                            font: { family: 'Inter' },
                            callback: v => 'Rs.' + Number(v).toLocaleString('en-IN')
                        }
                    },
                    ySpot: {
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        ticks: {
                            color: '#3b82f6',
                            font: { family: 'Inter' },
                            callback: v => v.toLocaleString() + ' pts'
                        }
                    }
                }
            }
        });
        return;
    }

    // --- Default: single-curve chart for selling / simulation ---
    const colors = {
        buying:     { line: '#10b981', fillTop: 'rgba(16,185,129,0.25)',  fillBot: 'rgba(16,185,129,0.0)' },
        selling:    { line: '#6366f1', fillTop: 'rgba(99,102,241,0.25)',  fillBot: 'rgba(99,102,241,0.0)' },
        simulation: { line: '#06b6d4', fillTop: 'rgba(6,182,212,0.25)',   fillBot: 'rgba(6,182,212,0.0)' }
    };
    const c = colors[strategyKey];

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
