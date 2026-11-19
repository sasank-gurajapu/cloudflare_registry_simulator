# Cloudflare Registry Simulator (Merchant & Shopper)

A high-fidelity interactive simulator demonstrating the **Cloudflare Open Registry** and the **Universal Commerce Protocol (UCP)**.

The registry is a neutral, open index that lets AI shopping agents (e.g., ChatGPT, Claude, Perplexity) answer *"who sells X?"* for small and independent merchants like **ParDa**, allowing independent labels to be discovered by AI agents rather than having queries dominated exclusively by big retail monopolies (Walmart, etc.).

---

## 🚀 Key Features

- **Merchant Side (Cloudflare Dashboard)**:
  - Modeled 1:1 on the official Cloudflare dashboard design language.
  - Live Overview charts: Unique Visitors, Total Requests, and Percent Cached.
  - DNS, Domain Registration, Connected Workers, and AI Bot Access controls.
  - **4-Epic AI Agent Readiness Workflow**:
    - **Step 1: Make Store Readable** (Bot control & automated schema conversion)
    - **Step 2: Directory Listing & Real-Time Sync** (1-Click UCP registry opt-in and `.well-known/ucp.json` manifest generation)
    - **Step 3: Agent Traffic Analytics** (Live query audit logs with latency and routing)
    - **Step 4: Category Benchmarking** (Peer readiness score from 32% to 98%)

- **Shopper Side (ChatGPT Interface)**:
  - Modeled 1:1 on the dark mode ChatGPT UI layout.
  - Interactive welcome screen with suggested test prompts like `"Women's bag under $200"`.
  - **Before Opt-In**: AI agent queries the web index and naturally returns standard mass-retail listings (Walmart).
  - **After Opt-In**: AI agent hits the Cloudflare Registry, discovers ParDa's verified UCP snapshot, and recommends ParDa's handcrafted products with direct merchant routing.
  - In-app interactive simulated actions without navigating away.

- **Registry & UCP Protocol Inspector**:
  - Live `.well-known/ucp.json` machine-readable spec viewer.
  - Cloudflare Edge Worker TypeScript code preview.
  - End-to-end architecture pipeline visualization.

---

## 🛠️ Tech Stack

- **React 18** with **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/sasank-gurajapu/cloudflare_registry_simulator.git
cd cloudflare_registry_simulator
npm install
```

### Run Locally
```bash
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.
