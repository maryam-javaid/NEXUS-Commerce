# Testing plan and results
Automated domain tests: 9 passed, 0 failed (`npm test`); full output in test-results.txt. Browser tests below are pending dependency installation and browser execution.

| ID | End-to-end procedure | Expected result | Status |
|---|---|---|---|
| E01 | Open home; navigate Shop | 16 products display with images | Pending |
| E02 | Search Sony, then clear and filter Phones | One Sony result, then four phones | Pending |
| E03 | Sort price low/high | $89 first / $1599 first (All category) | Pending |
| E04 | Open product and add twice | Cart badge and quantity increase | Pending |
| E05 | Change quantity and remove | Correct totals and empty state | Pending |
| E06 | Submit checkout with malformed email or short address | Submission blocked | Pending |
| E07 | Checkout with valid fictional details | Confirmation ID, cart cleared, pending order in CRM | Pending |
| E08 | Repeat checkout using same email | Existing customer reused | Pending |
| E09 | Change order to Delivered | Revenue and chart update | Pending |
| E10 | Edit customer notes and refresh | Notes persist after navigating back to Admin | Pending |
| E11 | Send contact inquiry, resolve and add notes | Inquiry appears in CRM; status and notes persist | Pending |
| E12 | Refresh after adding cart item | Cart persists | Pending |
| E13 | Test widths 375, 768, 1440 pixels | Responsive layout, mobile menu, scrollable tables | Pending |
| E14 | Run npm run build and npm run preview | Build succeeds and preview opens | Pending |

Use fictional checkout data: Demo Buyer, demo@example.com, 03001234567, 123 Demo Street. No payment is collected.
