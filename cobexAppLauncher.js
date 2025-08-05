const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const apps = [
  { name: 'Vault360', repoPath: './Vault360' },
  { name: 'SkyLink360', repoPath: './SkyLink360' },
  { name: 'CoreEngineerAI', repoPath: './CoreEngineerAI' }
];

// 🚀 Launch apps one by one
apps.forEach(app => {
  const appPath = path.resolve(__dirname, app.repoPath);
  const packagePath = path.join(appPath, 'package.json');

  if (fs.existsSync(packagePath)) {
    console.log(`\n📦 Installing dependencies for ${app.name}...`);
    exec(`cd ${appPath} && npm install`, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error installing ${app.name}:`, stderr);
        return;
      }
      console.log(`✅ Installed ${app.name}:`, stdout);

      console.log(`🚀 Starting ${app.name}...`);
      exec(`cd ${appPath} && npm start`, (err2, stdout2, stderr2) => {
        if (err2) {
          console.error(`❌ Error starting ${app.name}:`, stderr2);
        } else {
          console.log(`✅ ${app.name} is running:\n`, stdout2);
        }
      });
    });
  } else {
    console.warn(`⚠️ Skipped ${app.name}: No package.json found`);
  }
});
//
// --------------------------
// 🌇 Optional: React Time-Based Theme Example
// Put this in your component to switch background:
// --------------------------
// useEffect(() => {
//   const hour = new Date().getHours();
//   setIsNight(hour >= 18 || hour < 6); // 6pm–6am is night
// }, []);
//
// return (
//   <div className={`min-h-screen text-white font-sans px-4 py-8 transition-all duration-500 ${
//     isNight ? 'bg-black' : 'bg-gradient-to-b from-orange-400 to-yellow-100'
//   }`}>
//     {/* Header or content */}
//   </div>
// );
