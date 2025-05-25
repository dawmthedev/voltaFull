const fs = require('fs');
const path = require('path');

const resultsPath = path.resolve(__dirname, '..', 'jest-results.json');

function groupByProject(suites) {
  const groups = {};
  for (const suite of suites) {
    const file = suite.name || '';
    let project = 'other';
    if (file.includes(`${path.sep}server${path.sep}`) || file.includes('tests/server')) {
      project = 'server';
    } else if (file.includes(`${path.sep}client${path.sep}`) || file.includes('tests/client')) {
      project = 'client';
    }
    if (!groups[project]) {
      groups[project] = [];
    }
    groups[project].push(suite);
  }
  return groups;
}

function summarizeSuites(suites) {
  return suites.reduce(
    (acc, suite) => {
      const assertions = suite.assertionResults || [];
      acc.total += assertions.length;
      acc.passed += suite.numPassingTests ?? assertions.filter(a => a.status === 'passed').length;
      acc.failed += suite.numFailingTests ?? assertions.filter(a => a.status === 'failed').length;
      acc.pending += suite.numPendingTests ?? assertions.filter(a => a.status === 'pending').length;
      return acc;
    },
    { total: 0, passed: 0, failed: 0, pending: 0 }
  );
}

function main() {
  if (!fs.existsSync(resultsPath)) {
    console.error(`Results file not found at ${resultsPath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const suites = data.testResults || [];
  const grouped = groupByProject(suites);

  console.log('Jest results summary by project:');
  for (const [project, list] of Object.entries(grouped)) {
    const summary = summarizeSuites(list);
    console.log(
      `${project}: ${summary.passed}/${summary.total} passed, ` +
        `${summary.failed} failed, ${summary.pending} pending`
    );
  }
  return data; // jest requires processor to return results
}

module.exports = main;
