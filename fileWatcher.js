const fs = require('fs');
const chokidar = require('chokidar');

// Track debounces for each file
const debounceMap = new Map();

// Example function to broadcast messages
function broadcast(message) {
  console.log(`[Broadcast] ${message}`);
}

// Example assistant system (placeholder)
function findAvailableAssistant() {
  return {
    handleTask: (filePath, content) => {
      console.log(`Assistant is fixing: ${filePath}`);
    }
  };
}

// Debounce to prevent repeated triggers
function debounceProcess(filePath) {
  clearTimeout(debounceMap.get(filePath));
  debounceMap.set(filePath, setTimeout(() => {
    processFile(filePath);
  }, 100));
}

// Async file processing with error handling
async function processFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');

    // Auto-fix logic
    if (content.includes('console.log("error")')) {
      const assistant = findAvailableAssistant();
      if (assistant) {
        assistant.handleTask(filePath, content);
        broadcast(`✅ Auto-fixed issue in ${filePath}`);
      }
    }

  } catch (err) {
    console.error(`❌ Failed to process ${filePath}:`, err.message);
  }
}

// Start watching files
const watcher = chokidar.watch('./', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: false,
  depth: 99
});

// On file change, debounce the processing
watcher.on('change', filePath => {
  if (filePath.endsWith('.js')) {
    debounceProcess(filePath);
  }
});

// Clean up on shutdown
process.on('SIGINT', () => {
  console.log('\n🧹 Cleaning up watchers...');
  watcher.close().then(() => {
    console.log('✅ Watcher closed. Exiting.');
    process.exit(0);
  });
});
