const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const resultsFile = path.join(root, 'jest-results.json');
const serverFile = path.join(root, 'jest-server-results.json');
const clientFile = path.join(root, 'jest-client-results.json');

if (!fs.existsSync(resultsFile)) {
  console.error(`Results file not found at ${resultsFile}`);
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
const suites = data.testResults || [];
const serverSuites = [];
const clientSuites = [];
for (const suite of suites) {
  const name = suite.name || '';
  if (name.includes(`${path.sep}server${path.sep}`) || name.includes('tests/server')) {
    serverSuites.push(suite);
  } else if (name.includes(`${path.sep}client${path.sep}`) || name.includes('tests/client')) {
    clientSuites.push(suite);
  }
}

function buildResult(list) {
  return { ...data, testResults: list };
}

fs.writeFileSync(serverFile, JSON.stringify(buildResult(serverSuites), null, 2));
fs.writeFileSync(clientFile, JSON.stringify(buildResult(clientSuites), null, 2));
console.log(`Split results written to:\n- ${serverFile}\n- ${clientFile}`);
