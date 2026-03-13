/**
 * test/one-breath.test.ts
 * End-to-end: one breath from entropy to reward.
 */

import { birthAgentFromIfa } from '../bridge/birth-ifa-swibe';
import { executeTask } from '../bridge/rlm-osovm';
import { auditReceipt } from '../bridge/zangbeto-audit';
import { onSoulEvolve } from '../bridge/toc-evolve-hook';

async function runOneBreath() {
  console.log("🌬️ Initiating One Breath of the Organism...\n");

  // 1. Inhale: IfáScript entropy (Cowrie Cast)
  const entropy = { odu: [1, 0, 1, 1, 0, 1, 0, 1], seed: "0x369" };
  const birth = await birthAgentFromIfa(entropy);
  console.log(`✅ Birth: ${birth.agentId} (Pubkey: ${birth.vibe_key.slice(0, 10)}...)`);

  // 2. Decide & Execute: Omokoda parliament dispatches to OSOVM
  // This now calls the REAL Julia VM subprocess
  const vmResult = await executeTask({
    agent_pubkey: birth.vibe_key,
    think_hash: "sha256-mock-thought-hash",
    opcode: "COUNCIL_APPROVE",
    payload: { agent: birth.agentId }
  });
  console.log(`✅ Execute: VM Task ${vmResult.vm_task_hash.slice(0, 12)} | F1: ${vmResult.f1_score}`);

  // 3. Audit: Zangbeto security verifies the VM receipt
  const audit = await auditReceipt({
    receipt_id: "rec-" + vmResult.vm_task_hash.slice(0, 8),
    hash: vmResult.vm_task_hash,
    signer: birth.agentId,
    opcodes: ["COUNCIL_APPROVE"]
  });
  console.log(`✅ Audit: ${audit.status}`);

  // 4. Exhale: AIO reward (ToC Minting)
  // This logic is now mirrored in omokoda/sources/toc.move
  const evolve = await onSoulEvolve({
    soul_id: birth.agentId,
    new_rank: 2,
    old_rank: 1
  });
  console.log(`✅ Exhale: Minted ${evolve.reward_minted} ToC\n`);

  console.log("✨ The organism has breathed. Lifecycle complete.");
}

runOneBreath().catch(err => {
  console.error("❌ Breath failed:", err);
  process.exit(1);
});
