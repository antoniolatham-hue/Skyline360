const fs = require('fs');
const path = require('path');

/**
 * Generate a preview.html file for a given app.
 * The preview includes the app's cover image so that
 * services can display a quick visual reference.
 *
 * @param {{name: string, path: string}} app - Application details.
 */
function generatePreview(app) {
  if (!app || !app.name || !app.path) {
    throw new Error('An app object with name and path is required');
  }

  fs.writeFileSync(
    path.join(app.path, 'preview.html'),
    `<img src="assets/cover.png" style="width:100%;max-width:600px;" alt="${app.name} Cover"/>`
  );
}

module.exports = { generatePreview };
