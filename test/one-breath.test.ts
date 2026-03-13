/**
 * test/one-breath.test.ts
 * End-to-end: one breath from entropy to reward.
 */

import { birthAgentFromIfa } from '../bridge/birth-ifa-swibe';
import { dispatchToVM } from '../bridge/rlm-osovm';
import { auditReceipt } from '../bridge/zangbeto-audit';
import { onSoulEvolve } from '../bridge/toc-evolve-hook';

async function runOneBreath() {
  console.log("🌬️ Initiating One Breath of the Organism...\n");

  // 1. Inhale: IfáScript entropy
  const entropy = { odu: [1, 0, 1, 1, 0, 1, 0, 1], seed: "0x369" };
  const birth = await birthAgentFromIfa(entropy);
  console.log(`✅ Birth: ${birth.agentId}`);

  // 2. Decide: Omokoda parliament
  const dispatch = await dispatchToVM({
    lobe_id: "parliament-alpha",
    opcode: "COUNCIL_APPROVE",
    payload: { agent: birth.agentId },
    signature: "lobe-sig-777"
  });
  console.log(`✅ Decide: ${dispatch.vm_ref}`);

  // 3. Audit: Zangbeto security
  const audit = await auditReceipt({
    receipt_id: "rec-001",
    hash: "abc123hash",
    signer: birth.agentId,
    opcodes: ["COUNCIL_APPROVE"]
  });
  console.log(`✅ Audit: ${audit.status}`);

  // 4. Exhale: AIO reward
  const evolve = await onSoulEvolve({
    soul_id: birth.agentId,
    new_rank: 2,
    old_rank: 1
  });
  console.log(`✅ Exhale: Minted ${evolve.reward_minted} ToC\n`);

  console.log("✨ The organism has breathed. Lifecycle complete.");
}

runOneBreath().catch(console.error);
