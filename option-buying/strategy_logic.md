# Option Buying Strategy Overview

This document provides a concise, high‑level description of our Nifty weekly option buying strategy without revealing proprietary implementation details.

## Objective
- Generate consistent returns by trading weekly index options based on Nifty spot trends.
- Manage risk using spot‑based stop‑loss and trailing mechanisms.

## Core Concepts
- **Trend Detection**: Uses simple moving averages to identify bullish or bearish momentum.
- **Pullback Confirmation**: Looks for price pullbacks relative to a long‑term EMA before entering.
- **Entry Types**:
  - **Base Entry**: Triggered on a clear SMA crossover when the market is trending away from the EMA.
  - **Smart Re‑Entry**: Triggered after a pullback when price re‑crosses the EMA.
- **Risk Management**:
  - Initial stop‑loss set as a percentage of the Nifty spot price.
  - Trailing stop‑loss follows the spot high/low to protect gains.

## Execution Flow (Simplified)
1. Detect SMA 68 vs SMA 90 crossover to set trend direction.
2. Verify price is sufficiently away from the 340‑period EMA.
3. For **bullish** trend, look for a pullback below EMA, then a re‑cross above EMA to re‑enter.
4. For **bearish** trend, the mirror logic applies.
5. Once an option position is opened, apply spot‑based stop‑loss and trail it on each 5‑minute candle.
6. Exit when the trailing stop‑loss is breached.

## Notes
- The exact numerical thresholds (e.g., SMA periods, distance percentages, stop‑loss percentages) are tuned for the Nifty market and may evolve over time.
- All trades are executed on the current weekly expiry option whose premium is close to a target price.

*The detailed Pine‑Script implementation lives in the source code and is intentionally kept private to preserve the strategy’s edge.*
