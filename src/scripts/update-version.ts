const fs = require('fs');
const version = process.env.VERSION ?? 'none';

if (version !== 'none') {
  try {
    const packageJsonString = fs.readFileSync('package.json', 'utf-8');
    const packageJson = JSON.parse(packageJsonString);
    packageJson.version = version;

    const updatedPackageJsonString = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync('package.json', updatedPackageJsonString, 'utf-8');
    console.log('Version updated ✅');
  } catch (error) {
    console.log(error);
  }
}
