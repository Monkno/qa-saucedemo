const fs = require('fs');

const resultsPath = 'test-results/results.json';
const outputPath = 'reports/TestExecution.md';

if (!fs.existsSync(resultsPath)) {
  console.error(`Test results not found at: ${resultsPath}`);
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

function collectAllPlaywrightTests(suite, acc = []) {
  if (!suite) return acc;

  // specs -> tests
  if (Array.isArray(suite.specs)) {
    for (const spec of suite.specs) {
      if (Array.isArray(spec.tests)) {
        acc.push(...spec.tests);
      }
    }
  }

  // nested suites
  if (Array.isArray(suite.suites)) {
    for (const child of suite.suites) {
      collectAllPlaywrightTests(child, acc);
    }
  }

  return acc;
}

let allTests = [];
if (Array.isArray(results.suites)) {
  for (const suite of results.suites) {
    allTests = collectAllPlaywrightTests(suite, allTests);
  }
}

// Last status
function getFinalStatus(testObj) {
  const res = Array.isArray(testObj.results) ? testObj.results : [];
  const last = res.length ? res[res.length - 1] : null;
  return last?.status || 'unknown'; // passed | failed | skipped | timedOut | interrupted | unknown
}

const total = allTests.length;
const passed = allTests.filter((t) => getFinalStatus(t) === 'passed').length;
const failed = allTests.filter(
  (t) => getFinalStatus(t) === 'failed' || getFinalStatus(t) === 'timedOut',
).length;
const skipped = allTests.filter((t) => getFinalStatus(t) === 'skipped').length;

const date = new Date().toISOString().split('T')[0];

const content = `# Test Execution Report – Login Module

## Application Under Test
https://www.saucedemo.com

## Execution Scope
- Module: Login
- Test suite: tests/e2e.spec.ts

## Automated Test Cases
- TC-LOGIN-001 – Login with valid credentials
- TC-LOGIN-004 – Login with empty Username and Password
- TC-LOGIN-007 – Login with invalid credentials
- TC-LOGIN-008 – Login with locked out user
- TC-LOGIN-009 – Login with credentials containing leading and trailing spaces

## Last Execution
- Date: ${date}
- Environment: Local
- Browser: Chromium
- Tool: Playwright
- Command executed: npm test

## Execution Results
- Total test cases executed: ${total}
- Passed: ${passed}
- Failed: ${failed}
- Skipped: ${skipped}

## Evidence
HTML execution report available locally using:
npx playwright show-report
`;

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(outputPath, content, 'utf-8');

console.log(`TestExecution.md updated: ${outputPath}`);