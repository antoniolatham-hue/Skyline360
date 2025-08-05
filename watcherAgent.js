// watcherAgent.js — AI Optimized File Watcher with Auto-Fix & Performance Tuning

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Debounce map to avoid repeated triggers
const debounceMap = new Map();

// File watcher directory
const WATCH_DIR = path.join(__dirname, 'watched'); // <-- change if needed

// Async file processing
async function processFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');

    if (content.includes('console.log("error') || content.includes('fixMe')) {
      const fixedContent = content.replace(/console\.log\("error.*"\);?/g, '');
      await fs.promises.writeFile(filePath, fixedContent, 'utf8');

      broadcast(`✅ Auto-fixed issue in ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`❌ Error processing file ${filePath}:`, err.message);
  }
}

// Broadcast safely
function broadcast(message) {
  console.log('📡 Broadcast:', message);
}

// Debounce file changes
function debounceProcess(filePath) {
  clearTimeout(debounceMap.get(filePath));
  debounceMap.set(filePath, setTimeout(() => {
    processFile(filePath);
  }, 300));
}

// File watcher setup
const watcher = chokidar.watch(WATCH_DIR, {
  persistent: true,
  ignoreInitial: true,
  depth: 1
});

watcher.on('change', (filePath) => {
  if (!filePath.endsWith('.js')) return;
  debounceProcess(filePath);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down... closing file watchers.');
  watcher.close();
  process.exit();
});

console.log(`🚀 AI Watcher running at: ${WATCH_DIR}`);
