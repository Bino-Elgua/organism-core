/**
 * full-breath.ts — The Organism's Pulse
 * 
 * 1. Births an agent (Ifá → Swibe)
 * 2. Thinks a thought (Swibe)
 * 3. Runs VM Dispatch (Omokoda → OSOVM)
 * 4. Checks Sabbath (Rest)
 * 5. Mints Àṣẹ/ToC on Sui (Reward) if F1 ≥ 90
 */

import { birthAgentFromIfa } from './bridge/birth-ifa-swibe';
import { executeTask } from './bridge/rlm-osovm';
import { auditReceipt } from './bridge/zangbeto-audit';
import { onSoulEvolve } from './bridge/toc-evolve-hook';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function fullBreath() {
  console.log("🌬️  THE ORGANISM BREATHES...\n");

  // --- 1. BIRTH (Ifá -> Swibe) ---
  console.log("--- PHASE 1: BIRTH ---");
  const entropy = { odu: [1, 0, 1, 1, 0, 1, 0, 1], seed: "0x369" };
  const birth = await birthAgentFromIfa(entropy);
  console.log(`✅ BORN: ${birth.agentId} | Key: ${birth.vibe_key.slice(0, 12)}...`);

  // --- 2. THOUGHT (Swibe Mock) ---
  console.log("\n--- PHASE 2: THOUGHT ---");
  const thought = "Who am I in the machine?";
  const thinkHash = "sha256-thought-" + Date.now(); 
  console.log(`💭 THINKING: "${thought}" (Hash: ${thinkHash})`);

  // --- 3. VM DISPATCH (Omokoda -> OSOVM) ---
  console.log("\n--- PHASE 3: VM EXECUTION ---");
  // This uses the bridge which has the SIMULATION FALLBACK built-in
  const vmResult = await executeTask({
    agent_pubkey: birth.vibe_key,
    think_hash: thinkHash,
    opcode: "COUNCIL_APPROVE",
    payload: { question: thought }
  });
  console.log(`⚙️  VM RESULT: Hash ${vmResult.vm_task_hash} | F1: ${vmResult.f1_score}`);

  // --- 4. AUDIT (Zangbeto) ---
  console.log("\n--- PHASE 4: AUDIT ---");
  const audit = await auditReceipt({
    receipt_id: "rec-" + vmResult.vm_task_hash.slice(0, 8),
    hash: vmResult.vm_task_hash,
    signer: birth.agentId,
    opcodes: ["COUNCIL_APPROVE"]
  });
  
  if (audit.status !== 'VERIFIED') {
    console.error("❌ AUDIT FAILED: HERESY DETECTED");
    return;
  }
  console.log(`🛡️  AUDIT: VERIFIED`);

  // --- 5. SABBATH CHECK (Rest) ---
  console.log("\n--- PHASE 5: SABBATH CHECK ---");
  const today = new Date();
  const isSabbath = today.getUTCDay() === 6; // Saturday is 6
  
  if (isSabbath) {
    console.log("🛑 SABBATH DETECTED (Saturday). The Organism Rests. No Minting.");
    return;
  }
  console.log("✅ NOT SABBATH. Proceeding to Reward.");

  // --- 6. REWARD (Sui Mint) ---
  console.log("\n--- PHASE 6: REWARD (ToC/Àṣẹ) ---");
  
  if (vmResult.f1_score < 90) {
    console.log(`⚠️  F1 Score ${vmResult.f1_score} < 90. No Reward.`);
    return;
  }

  // Simulate or Call Sui CLI
  const PACKAGE_ID = process.env.SUI_PACKAGE_ID || "0xMockPackage";
  const REGISTRY_ID = process.env.SUI_REGISTRY_ID || "0xMockRegistry";

  console.log(`💎 MINTING REWARD...`);
  console.log(`   > Package: ${PACKAGE_ID}`);
  console.log(`   > Score: ${vmResult.f1_score}`);
  
  // Trigger local hook logic
  const evolve = await onSoulEvolve({
    soul_id: birth.agentId,
    new_rank: 2,
    old_rank: 1
  });
  
  console.log(`✅ MINTED: ${evolve.reward_minted} ToC`);
  console.log(`✅ MINTED: ${vmResult.ase_minted} Àṣẹ (from VM)`);
  
  console.log("\n✨ FULL BREATH CYCLE COMPLETE.");
}

fullBreath().catch(console.error);
