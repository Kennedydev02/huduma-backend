const { execSync } = require('child_process');

try {
  // Give execute permissions to react-scripts
  execSync('chmod +x ./node_modules/.bin/react-scripts');
  // Run the build
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 