QA SauceDemo Challenge

Application Under Test
https://www.saucedemo.com

Description
This repository contains the QA Challenge deliverables for the SauceDemo application, focusing on the Login module.
The project includes test automation, supporting documentation, and an automatic test execution report.

Tech Stack
Playwright with TypeScript
Page Object Model (POM)

Project Structure
pages/
Contains Page Object classes for the application screens.

tests/
Contains automated end-to-end tests for the Login module.

scripts/
Utility scripts used to support test execution and reporting.

reports/
Contains the automatically generated TestExecution.md report.

Setup

Install dependencies
npm install

Install Playwright browsers
npx playwright install

Run Tests

Run all automated tests
npm test

Run tests in headed mode
npm run test:headed

View HTML Report
After executing the tests, the Playwright HTML report can be viewed locally using:
npm run test:report

Test Execution Report

After each test execution, a summary report is generated automatically at:
reports/TestExecution.md

This report reflects the latest execution results and is kept in sync with the automated tests.

Automated Scenarios

The following Login scenarios are automated:

TC-LOGIN-001 Login with valid credentials (standard_user)

TC-LOGIN-004 Login with empty Username and Password

TC-LOGIN-007 Login with invalid credentials

TC-LOGIN-008 Login with locked out user

TC-LOGIN-009 Login with credentials containing leading and trailing spaces

Note: The automation focuses on high-value and critical login scenarios aligned with the documented test cases and reported bugs.
