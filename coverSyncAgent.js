// coverSyncAgent.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const apps = [
  { name: 'Vault360', path: './Vault360', repo: 'https://github.com/YourName/Vault360.git', coverPrompt: 'futuristic vault, tech, purple, secure' },
  { name: 'CoreEngineerAI', path: './CoreEngineerAI', repo: 'https://github.com/YourName/CoreEngineerAI.git', coverPrompt: 'coding AI, gears, blueprint style' },
  { name: 'SkyLink360', path: './SkyLink360', repo: 'https://github.com/YourName/SkyLink360.git', coverPrompt: 'sky map, aircraft, digital dashboard' },
  // Add more apps here...
];

// Simulated cover generator (plug your AI generator here)
function generateCover(prompt, outputPath) {
  const sampleCoverText = `Cover generated for: ${prompt}`;
  fs.writeFileSync(outputPath, sampleCoverText); // In real use, replace with image generator
  console.log(`🎨 Generated cover for "${prompt}" → ${outputPath}`);
}

// Sync and push to GitHub
function syncCoverToRepo(app) {
  const coverPath = path.join(app.path, 'assets', 'cover.txt'); // Replace 'cover.txt' with PNG/SVG if needed
  generateCover(app.coverPrompt, coverPath);

  const gitCommands = `
    cd ${app.path} &&
    git add assets/cover.txt &&
    git commit -m "📦 Auto-added cover image for ${app.name}" || echo "No cover change to commit." &&
    git push ${app.repo}
  `;
  exec(gitCommands, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error syncing ${app.name}:`, stderr);
    } else {
      console.log(`✅ ${app.name} synced to GitHub:\n${stdout}`);
    }
  });
}

// Loop through all apps
function runCoverSync() {
  apps.forEach(app => {
    const assetDir = path.join(app.path, 'assets');
    if (!fs.existsSync(assetDir)) fs.mkdirSync(assetDir, { recursive: true });

    syncCoverToRepo(app);
  });
}

// 🔁 Run now and every 30 minutes
runCoverSync();
setInterval(runCoverSync, 1000 * 60 * 30);
