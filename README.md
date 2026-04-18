# Implementing Rider Tracking on Quick Commerce Apps

> A Design & Analysis of Algorithms seminar presentation exploring the graph theory, shortest-path algorithms, and real-time systems that power 10-minute grocery delivery in apps like Blinkit and Zepto.

---

## Authors

| Name | Roll Number |
|---|---|
| Harsh Dubey | RA2411033010002 |
| Mridula Manoj | RA2411033010012 |
| Abhiraj Bhowmick | RA2411033010013 |

---

## About

This is an interactive web-based presentation (10 slides) built with React + Vite. It covers the full algorithmic stack behind real-time rider tracking in quick commerce — from weighted graph modelling of road networks all the way to production-scale optimisations used by Blinkit and Zepto.

Each slide contains a **live, animated 3D Canvas visualisation** rendered entirely with the HTML5 Canvas 2D API and a custom perspective-projection engine (no Three.js).

---

## Slide Overview

| # | Title | Key Concepts |
|---|---|---|
| 1 | **Title Slide** | Introduction |
| 2 | **The Quick Commerce Challenge** | Scale metrics, dark stores, the 10-minute promise |
| 3 | **Road Networks as Weighted Graphs** | G(V, E, W) model, graph sparsity, dynamic edge weights |
| 4 | **Dijkstra's Algorithm** | Time/space complexity, binary heap, bidirectional Dijkstra |
| 5 | **Graph-Based Live Tracking** | Map matching (HMM/Viterbi), incremental re-routing, ETA computation |
| 6 | **Blinkit & Zepto Production Systems** | Dark store nodes, GPS sensors, Geohash spatial indexing, Contraction Hierarchies |
| 7 | **Chennai Delivery Case Study** | End-to-end trace of a single delivery — graph lookups, live re-routing, feedback loop |
| 8 | **Advanced Optimisations** | Contraction Hierarchies, Hub Labels, time-dependent routing, order batching, Redis/Kafka/WebSocket architecture |
| 9 | **Key Takeaways** | Applicability to ride-sharing, food delivery, logistics, navigation; emerging challenges |
| 10 | **Conclusion** | Competitive advantage through algorithmic efficiency |

---

## Algorithms & Concepts Covered

- **Dijkstra's Shortest-Path Algorithm** — O(V²), O((V+E) log V) with binary heap, O(E + V log V) with Fibonacci heap, bidirectional variant
- **Contraction Hierarchies (CH)** — Preprocessing that enables sub-millisecond queries on city-scale graphs
- **Hub Labels** — Pre-computed shortest paths between hub nodes reducing queries to lookups
- **Map Matching with Hidden Markov Models (HMM)** — Snapping noisy GPS points to road segments using the Viterbi algorithm
- **Incremental Re-routing** — O(k log k) partial graph updates instead of full O((V+E) log V) recomputation
- **Geohash Spatial Indexing** — O(1) lookup of nearby riders / dark stores without scanning all data
- **Exponential Moving Average** — Edge weight refinement from historical delivery time feedback

---

## Live 3D Visualisations

Six custom animated visualisations, one per relevant slide, all written with vanilla Canvas 2D:

| Component | Slide | What it shows |
|---|---|---|
| `Graph3D` | 3 | Weighted road graph G(V,E,W) — rotating nodes, edges, weight labels |
| `Dijkstra3D` | 4 | Algorithm state — visited/unvisited nodes, shortest-path edges, distance badges |
| `LiveTracking3D` | 5 | Road network with pulsing matched GPS pings and noisy red outliers |
| `DeliveryTrace3D` | 7 | Animated rider moving along primary path + dashed orange re-route |
| `AdvancedTech3D` | 8 | Contraction Hierarchy graph — hub/CH/time/batch nodes with colour-coded edges |
| `ProductionSystem3D` | 6 | System architecture with live data-packet animation across all components |

All visualisations:
- Use a custom `project(x, y, z, rotX, rotY, cx, cy)` perspective-projection function
- Sort all draw calls by depth (z-value) for correct occlusion
- Animate with `requestAnimationFrame` using delta-time based rotation
- Resize responsively via `ResizeObserver` — filling 100% of slide width at any viewport

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + TypeScript |
| Bundler | Vite 7 |
| Styling | Tailwind CSS 4 |
| 3D Visualisations | HTML5 Canvas 2D API (custom projection) |
| Routing | Wouter |
| Icons | Lucide React |
| Package manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run dev server

```bash
pnpm run dev
```

The presentation will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for production

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

### Type-check

```bash
pnpm run check
```

---

## Project Structure

```
rider-tracking-presentation/
├── client/
│   └── src/
│       ├── components/
│       │   ├── slides/          # Slide1.tsx – Slide10.tsx
│       │   ├── visualizations/  # Six 3D Canvas components
│       │   └── ui/              # Shared UI components
│       ├── pages/
│       │   └── Presentation.tsx # Main slide runner with navigation
│       └── index.css
├── server/
│   └── index.ts                 # Express dev server
├── shared/                      # Shared types
├── slide_content.md             # Full slide content reference
├── animation-specs.md           # 3D visualisation technical specs
├── vite.config.ts
└── package.json
```

---

## Key Metrics Referenced

| Metric | Value |
|---|---|
| Mumbai metro road nodes | ~500,000 |
| Mumbai metro road edges | ~2,000,000 |
| Concurrent riders (Zepto, metro) | 5,000+ |
| GPS ping interval | 3–5 seconds |
| Path recomputation interval | ~5 seconds |
| Queries per second (at scale) | ~1,000 |
| Query time with Contraction Hierarchies | 1–5 ms |
| Dijkstra on 500K nodes (binary heap) | 10–50 ms |
| API p99 response time requirement | < 100 ms |
| Orders delivered within 15 min | > 90% |

---

## Context

Submitted as a seminar presentation for the **Design & Analysis of Algorithms** course, demonstrating how classical graph algorithms translate into production systems at the scale of India's quick commerce industry.
