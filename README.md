# Inventory Logic Tests

This project contains automated tests for the SauceDemo inventory page.

## What is covered

### 1. Sorting validation

- login with standard user
- select "Price (low to high)"
- collect all prices from the page
- convert them to numbers
- verify that prices are sorted in ascending order

### 2. Cart state logic

- add 2 items to cart
- verify cart badge shows "2"
- open cart and verify both items are present
- remove 1 item
- verify cart badge shows "1"
- verify cart content is updated correctly


## Sorting validation logic

The test gets all prices as text (for example "$29.99"), removes the "$" symbol and converts them into numbers.

Then it creates a copy of the array and sorts it using:

a - b

After that it compares:
- original array
- sorted array

If both arrays are equal, sorting works correctly.


## Tech stack

- WebDriverIO
- JavaScript
- Mocha
- XPath


## Project structure

- test/specs – test files
- test/pageobjects – page objects
- test/pageobjects/components – reusable components
- test/utils – utility functions