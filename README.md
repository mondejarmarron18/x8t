# x8t

A utility for safely executing functions.

## What Problem Does It Solve?

1. **Variable Scope Inside** `try-catch` **Blocks.**

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

   Declaring variables outside the `try-catch` block is necessary to use them later. With x8t, you eliminate this extra boilerplate and handle function execution cleanly.

   Instead, you can access the result directly:

   ```typescript
   const { result, error } = await x8tAsync(apiRequest);
   // Now you can easily access the error or result outside the try-catch block
   ```

2. **Avoiding Nested** `try-catch` **Blocks**

   Nesting multiple `try-catch` blocks to handle different logic can make code messy and hard to read.

   Instead of putting all your code in a single `try-catch` block, you can handle each operation individually with `x8t`, keeping your code modular and maintainable.

3. **Treating Errors as Values**

   By capturing errors as values, you can conditionally handle them instead of immediately throwing or logging. This approach provides greater flexibility:

   ```typescript
   const { result, error } = x8tSync(() => {
     throw new Error("Intentional error!");
   });
   if (error !== null) {
     console.log("Custom handling for error:", error.message);
     throw new Error("Something went wrong!");
   }
   ```

4. **Result Typing for Improved Developer Experience.**

   With `x8t`, you can explicitly type the result for stronger TypeScript support, reducing type-related bugs and enabling better IntelliSense:

   ```typescript
   type User = {
     email: string;
     name: string;
   };

   const { result, error } = x8tSync<User>(getUser);

   if (error !== null) {
     return console.error(error);
   }

   console.log(`User name: ${result.name}`);
   ```

5. **Avoiding Unintended System Downtime**

   By safely handling errors during function execution, `x8t` ensures that your application remains robust and less prone to unexpected crashes, especially in critical operations.

## Installation

You can install `x8t` using npm or yarn:

```bash
npm install x8t
or
yarn add x8t
```

## Usage

### Synchronous Example

Here's a quick example of how to use `x8tSync`:

```typescript
import { x8tSync } from "x8t";

// Named function for better logging
const successFunction = () => "Function executed successfully!";

// Function that throws an error
const errorFunction = () => {
  throw new Error("An error occurred!");
};

// Execute a successful function
const { result, error } = x8tSync(successFunction, { log: true });
console.log(result);
// Output: "Function executed successfully!"

// Execute a function that throws an error
const { error: caughtError } = x8tSync(errorFunction, { log: true });
if (caughtError !== null) {
  console.log("Handling error as a value:", caughtError.message);
  // You can re-throw a custom error or handle it conditionally
}
```

### Asynchronous Example

You can also use `x8tAsync` with asynchronous functions:

```typescript
import { x8tAsync } from "x8t";

const asyncApiRequest = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("API request succeeded!"), 200)
  );
};

// Execute an asynchronous function
(async () => {
  const { result, error, executionTime } = await x8tAsync(asyncApiRequest, {
    log: true,
  });
  if (error !== null) {
    console.error("API request failed:", error.message);
    // Custom error handling logic
  } else {
    console.log("API request result:", result);
  }
  console.log("Execution time:", executionTime);
})();
```

## Logging

You can enable logging to get details about function execution:

```typescript
import { x8tAsync } from "x8t";

(async () => {
  await x8tAsync(
    async () => {
      throw new Error("API Error!");
    },
    { log: true }
  );
})();
```

When logging is enabled, you'll see messages like:

```
Function "anonymous" failed in 123ms
Error: API Error!
```

## Features

`x8tSync(fn: Function, options?: { log?: boolean })`

- fn: The synchronous function to be executed.
- options: An optional object to customize the behavior of logging.
  - log: If set to true, logs function execution details.

`x8tAsync(fn: Function, options?: { log?: boolean })`

- fn: The asynchronous function to be executed.
- options: An optional object to customize the behavior of logging.
  - log: If set to true, logs function execution details.

#### Returns

For both `x8tSync` and `x8tAsync`:

- An object containing:
  - result: The result of the function execution.
  - error: The error object if the function throws an error, or null.
  - executionTime: The time taken for execution in milliseconds.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author

Marvin Ronquillo
(Your GitHub Profile)[https://github.com/mondejarmarron18]
