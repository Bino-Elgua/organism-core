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
| **Nex** | 👽 Alien Mind | Graph-based reasoning and self-bootstrapping. |

## 🔌 Bridge Status

Located in `/bridge`, these TypeScript files glue the ecosystem together:
- `birth-ifa-swibe.ts`: **Wired.** Odu entropy → Swibe agent identity.
- `rlm-osovm.ts`: **Wired.** Parliamentary decisions → OSOVM opcodes. (Currently includes a **Simulation Fallback** for environments where Julia binary execution is unstable).
- `toc-evolve-hook.ts`: **Wired.** Soul evolution → ToC reward minting. (Logic mirrors `omokoda/sources/toc.move`).
- `zangbeto-audit.ts`: **Wired.** VM receipts → Security verification.

## 🧪 End-to-End: One Breath

The ecosystem "breathes" in a cycle from entropy to finality. Run the verification locally:
```bash
cd organism-core
npm install
npm test
```

Verification output shows the complete lifecycle:
1. **Inhale**: IfáScript casts a cowrie pattern.
2. **Birth**: Swibe births an agent from that pattern.
3. **Decide**: Omokoda (parliament) dispatches a task.
4. **Execute**: ÒSỌ́VM executes opcodes (via `bridge/rlm-osovm.ts`).
5. **Audit**: Zangbeto verifies the receipt.
6. **Exhale**: AIO settles rewards and the agent's soul evolves.

---
*Created by the Bino-Elgua Collective.*
