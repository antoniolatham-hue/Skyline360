const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// === CONFIGURATION ===
const baseDir = __dirname;
const sharedToolsPath = path.join(baseDir, 'sharedTools');
const targets = [
  'Vault360', 'CoreEngineerAI', 'SkyLink360', 'NurseTrack',
  'WanderBalance', 'ClarityMind', 'AgentAI_Marketing',
  'AgentAI_Security', 'AgentAI_Sync'
];

// === 1. Auto-Sync to GitHub ===
function autoSync(folder) {
  const fullPath = path.join(baseDir, folder);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${folder} not found.`);
    return;
  }

  exec(`cd ${fullPath} && git add . && git commit -m "Auto sync from master" && git push`, (err, stdout, stderr) => {
    if (err) {
      console.log(`❌ Sync error in ${folder}:\n${stderr}`);
    } else {
      console.log(`✅ Synced ${folder}:\n${stdout}`);
    }
  });
}

// === 2. Auto-Link Shared Tools ===
function syncSharedTools(folder) {
  const dest = path.join(baseDir, folder, 'tools');
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  exec(`rsync -av --exclude='node_modules' ${sharedToolsPath}/ ${dest}/`, (err, stdout, stderr) => {
    if (err) {
      console.log(`❌ Tools sync failed for ${folder}:\n${stderr}`);
    } else {
      console.log(`🔗 Shared tools updated for ${folder}`);
    }
  });
}

// === 3. Register New App/Agent Automatically ===
function registerNew(folderName) {
  const logPath = path.join(baseDir, 'autoSyncTargets.json');
  let list = [];
  if (fs.existsSync(logPath)) {
    list = JSON.parse(fs.readFileSync(logPath));
  }

  if (!list.includes(folderName)) {
    list.push(folderName);
    fs.writeFileSync(logPath, JSON.stringify(list, null, 2));
    console.log(`📦 Registered new target: ${folderName}`);
  }
}

// === 4. Install Agent (optional) ===
function installAgent(agentConfig) {
  const agentDir = path.join(baseDir, agentConfig.name);
  if (!fs.existsSync(agentDir)) fs.mkdirSync(agentDir);
  fs.writeFileSync(path.join(agentDir, 'README.md'), `# ${agentConfig.name}\n\nRole: ${agentConfig.role}`);
  agentConfig.tools.forEach(tool => {
    console.log(`🔌 ${agentConfig.name} linked with ${tool}`);
  });
  registerNew(agentConfig.name);
  syncSharedTools(agentConfig.name);
  autoSync(agentConfig.name);
}

// === 5. RUN ALL ===
targets.forEach(target => {
  registerNew(target);
  syncSharedTools(target);
  autoSync(target);
});

// === 6. Optional: Add new agent here ===
/*
installAgent({
  name: 'AgentAI_Research',
  role: 'Tracks medical research, cures, trends',
  tools: ['PubMedAPI', 'GPT-4', 'AutoCategorizer']
});
*/
