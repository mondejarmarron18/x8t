# x8t

A utility for safely executing functions.

## Installation

You can install `x8t` using npm or yarn:

```bash
npm install x8t
or
yarn add x8t
```

## Usage

### Basic Example

Here's a quick example of how to use `x8t`:

```javascript
import x8t from "x8t";

// Named function for better logging
const successFunction = () => {
  return "Function executed successfully!";
};

// Function that throws an error
const errorFunction = () => {
  throw new Error("An error occurred!");
};

// Execute a successful function
const result = x8t(successFunction, {
  log: true,
});
console.log(result); // Output: "Function executed successfully!"

// Execute a function that throws an error
const result = x8t(errorFunction, {
  log: true,
});
console.log(result); // Output: "Error: An error occurred!"
```

## With Asynchronous Functions

You can also use `x8t` with asynchronous functions:

```javascript
const asyncFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Async function succeeded!"), 200)
  );
};

// Execute an asynchronous function
(async () => {
  const { result, error, executionTime } = await x8t(asyncFunction, {
    log: true,
  });
  console.log(result); // Output: "Async function succeeded!"
  console.log(executionTime); // Output: e.g., "200ms"
})();
```

## Logging

You can enable logging to get details about function execution:

```javascript
(async () => {
  await x8t(
    () => {
      throw new Error("API Error!");
    },
    { log: true }
  );
})();
```

When logging is enabled, you'll see messages like:

```
Function "anonymous function" execution failed with an execution time of 0.123ms
```

## Features

`x8t(fn: Function, options?: { log?: boolean })`

- **fn:** The function to be executed. It can be synchronous or asynchronous.
- **options:** An optional object to customize the behavior of logging.
  - **log:** If set to true, logs function execution details.

**Returns**

- A Promise that resolves to an object containing:
  - **result:** The result of the function execution.
  - **error:** The error object if the function throws an error, or `null`.
  - **executionTime:** The time taken for execution in milliseconds.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author

Marvin Ronquillo
(Your GitHub Profile)[https://github.com/mondejarmarron18]
