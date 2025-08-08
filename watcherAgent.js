const fs = require('fs');
const path = require('path');

let chokidar;
try {
  chokidar = require('chokidar');
} catch {
  console.warn('⚠️ chokidar not found, using fs.watch fallback.');
}

const WATCH_DIR = path.join(__dirname, 'watched');
const debounceMap = new Map();

function removeErrorLogs(content) {
  return content.replace(/console\.log\(["']error.*?["']\);?\n?/gi, '');
}

async function processFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    if (/console\.log\(["']error/i.test(content)) {
      const fixed = removeErrorLogs(content);
      await fs.promises.writeFile(filePath, fixed, 'utf8');
      console.log(`✅ Auto-fixed error logs in ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`❌ Error processing file ${filePath}: ${err.message}`);
  }
}

function debounceProcess(filePath) {
  if (debounceMap.has(filePath)) clearTimeout(debounceMap.get(filePath));
  const t = setTimeout(() => {
    processFile(filePath);
    debounceMap.delete(filePath);
  }, 500);
  debounceMap.set(filePath, t);
}

function startWatching() {
  if (chokidar) {
    const watcher = chokidar.watch(WATCH_DIR, { persistent: true, ignoreInitial: false });
    watcher.on('add', debounceProcess);
    watcher.on('change', debounceProcess);
    console.log(`👀 Watching with chokidar: ${WATCH_DIR}`);
  } else {
    fs.watch(WATCH_DIR, (eventType, filename) => {
      if (!filename) return;
      if (eventType === 'change' || eventType === 'rename') {
        debounceProcess(path.join(WATCH_DIR, filename));
      }
    });
    console.log(`👀 Watching with fs.watch (fallback): ${WATCH_DIR}`);
  }
}

if (!fs.existsSync(WATCH_DIR)) {
  fs.mkdirSync(WATCH_DIR, { recursive: true });
  console.log(`🗂 Created watch directory: ${WATCH_DIR}`);
}

startWatching();
