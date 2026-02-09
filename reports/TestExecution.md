# Test Execution Report – Login Module

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
- Date: 2026-02-09
- Environment: Local
- Browser: Chromium
- Tool: Playwright
- Command executed: npm test

## Execution Results
- Total test cases executed: 5
- Passed: 5
- Failed: 0
- Skipped: 0

## Evidence
HTML execution report available locally using:
npx playwright show-report
