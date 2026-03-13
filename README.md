# 🌿 Organism Core: The Nerve Center

The `organism-core` is the central wiring system for the Technosis Ecosystem. It does not contain the business logic of each project; instead, it owns the **relationships**, **events**, and **bridges** that allow the separate "organs" to breathe as a single body.

## 🗺️ The Elder's Map

| Project | Role | Connection |
| :--- | :--- | :--- |
| **IfáScript** | 🌌 Entropy | Whispers binary Odu patterns to birth agents. |
| **Swibe** | 🧬 Identity | Translates entropy into sovereign agent keypairs. |
| **Omokoda** | 🧠 Governance | Parliamentary mind that dispatches VM opcodes. |
| **ÒSỌ́VM** | ⚙️ Execution | Verifies every thought with 100+ domain-specific opcodes. |
| **AIO** | 💎 Settlement | Mints "Tithe of Creation" (ToC) for soul evolution. |
| **Zangbeto** | 🛡️ Immune System | Audits VM receipts and slashes heretical states. |
| **Nex** | 🧠 Reasoning | Persistent graph execution server (Nex Gateway: 18789). |

## 🔌 Bridge Status

Located in `/bridge`, these TypeScript files glue the ecosystem together:
- `birth-ifa-swibe.ts`: **Wired.** Odu entropy → Swibe agent identity.
- `rlm-osovm.ts`: **Wired.** Parliamentary decisions → OSOVM opcodes.
  - *Current Status:* Includes a **Simulation Fallback**. Real Julia execution is blocked by system-level binary architecture mismatch (`unexpected e_type: 2`).
- `toc-evolve-hook.ts`: **Wired.** Soul evolution → ToC reward minting. (Logic mirrors `omokoda/sources/toc.move`).
- `zangbeto-audit.ts`: **Wired.** VM receipts → Security verification.

## 🧪 Verification

The ecosystem "breathes" in a cycle from entropy to finality.

### Run in Simulation Mode (Proof of Wiring)
```bash
cd organism-core
npm install
npm test
```

### Run in Real Mode (Proof of Life - Fails locally due to System Issue)
```bash
cd organism-core
FORCE_REAL_VM=true npm test
```

## 🚩 Current Blockers
1. **Dam 1 (Real VM)**: Julia binary mismatch in the current Termux/Android environment prevents real opcode execution.
2. **Phase 1 (Chain)**: `sui` CLI is not installed locally, preventing `toc.move` and `soul.move` deployment to Devnet.

---
*Created by the Bino-Elgua Collective.*
