# x8t

A utility for safely executing functions.

## What Problem Does It Solve?

### 1. **Variable Scope Inside \*\***`try-catch`\***\* Blocks**

Consider this scenario:

```typescript
let result;
try {
  result = await apiRequest();
} catch (error) {
  console.error(error);
}
// What if you want to access the `result` here?
```

Declaring variables outside the `try-catch` block is necessary to use them later. With `x8t`, you eliminate this extra boilerplate and handle function execution cleanly:

```typescript
const { result, error } = await x8tAsync(apiRequest);
// Now you can easily access the error or result outside the try-catch block
```

### 2. **Avoiding Nested \*\***`try-catch`\***\* Blocks**

Nesting multiple `try-catch` blocks to handle different logic can make code messy and hard to read. Instead, `x8t` lets you handle each operation individually, keeping your code modular and maintainable.

### 3. **Handling Promises Directly**

With `x8tAsync`, you can pass a direct promise or a promise-returning function as an argument:

```typescript
const myPromise = new Promise((resolve) => resolve("Promise resolved!"));
const { result, error } = await x8tAsync(myPromise);
console.log(result); // Output: "Promise resolved!"
```

### 4. **Treating Errors as Values Instead of Throwing Immediately**

Instead of throwing errors, `x8t` captures them as values:

```typescript
const { result, error } = x8tSync(() => {
  throw new Error("Intentional error!");
});

if (error !== null) {
  console.log("Custom handling for error:", error.message);
  throw error; // If needed
}
```

### 5. **Strong TypeScript Support**

Explicitly typing results improves TypeScript support:

```typescript
type User = {
  email: string;
  name: string;
};

const { result, error } = x8tSync<User>(getUser);

if (error !== null) {
  console.error(error);
}

console.log(`User name: ${result.name}`);
```

### 6. **Ensuring System Stability**

By safely handling errors, `x8t` helps prevent unexpected application crashes, especially in critical operations.

## Installation

```bash
npm install x8t
# or
yarn add x8t
```

## Usage

### **Synchronous Example**

```typescript
const { result, error } = x8tSync(successFunction, {
  logResult: true, // Log result from return value from executed function.
  logToFile: {
    // Writes logs to file
    path: "./x8t.log",
    logResult: true, // Add the result from the executed function to the log file
  },
  silent: true, // Prevents console logging
});
console.log(result);
if (error !== null) {
  console.log("Handling error as a value:", error.message);
}
```

### **Asynchronous Example**

```typescript
const { result, error, executionTime } = await x8tAsync(asyncApiRequest, {
  logResult: true, // Log result from return value from executed function.
  logToFile: { path: "./x8t.log" }, // Writes logs to file
  silent: false, // Allows console logging
});
console.log("API request result:", result);
```

## Logging

Logging is enabled by default but minimizes unnecessary output unless specified.

```typescript
import { x8tAsync } from "x8t";

(async () => {
  await x8tAsync(
    async () => {
      throw new Error("API Error!");
    },
    {
      logResult: true,
      logToFile: { path: "./x8t.log", logResult: true },
      silent: true,
    }
  );
})();
```

## Options

| Option      | Type                                    | Default     | Description                                                      |
| ----------- | --------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `logResult` | `boolean`                               | `false`     | Log result from return value from executed function.             |
| `logToFile` | `{ path: string; logResult?: boolean }` | `undefined` | Writes logs to a specified file.                                 |
| `silent`    | `boolean`                               | `false`     | Prevents console logging while allowing file logging if enabled. |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

[Marvin Ronquillo](https://github.com/mondejarmarron18)
