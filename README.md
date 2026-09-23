# Playwright Banking Assignment

End-to-end Playwright test automation for the Way2Automation Angular banking application.

## Prerequisites

- Node.js 20 or later
- npm
- Internet access to reach the test application and download Playwright browsers

## Installation

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Install the Chromium browser used by the test:

   ```bash
   npx playwright install chromium
   ```

## Test data

The test uses the `xlsx` package to read customer data from the Excel workbook included in the repository:

```text
testdata/TestData.xlsx
```

No separate test-data download or configuration is required. The workbook is loaded automatically when the test runs.

The workbook must contain a `CustomerData` worksheet with these columns:

| TestCase | FirstName | LastName | PostCode | Currency |
| --- | --- | --- | --- | --- |
| TC001 | Mohit | Aman | 831011 | Rupee |

Only rows whose `TestCase` value is `TC001` are used by the current test. Add additional rows with a matching test-case identifier when adding data-driven scenarios.

## Running the tests

Run all tests:

```bash
npx playwright test
```

Run the end-to-end banking flow test directly:

```bash
npx playwright test "TC001 - Verify End-to-End Customer Creation, Account Opening and Customer Login Flow.spec.js"
```

The configured browser runs in headed mode. The test creates a customer, opens a bank account, verifies the customer record, and logs in as the newly created customer.

## Test report

Playwright generates an HTML report after the test run. Open it with:

```bash
npx playwright show-report
```

Screenshots, videos, traces, and other test output are stored in `test-results/` and the report is stored in `playwright-report/`.

## Project structure

```text
pageobject/   Page Object Model classes used by the tests
tests/        Playwright test specifications
utils/        Excel test-data utility
testdata/     Excel test data used by the tests
playwright.config.js
```