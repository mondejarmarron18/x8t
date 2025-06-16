# x8t

A utility for safely executing functions.

```bash
  # Sync function
  const { result, error, executionTime } = x8tSync(func);

  # Async function
  const { result, error, executionTime } = await x8tAsync(asyncFunc);
```

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
const { result, error } = await x8tAsync(apiRequest, true, true);
// Now you can easily access the error or result outside the try-catch block
// Second parameter `false` disables or `true` enables logging
// Third parameter `false` disables or `true` enables result logging
```

### 2. **Avoiding Nested \*\***`try-catch`\***\* Blocks**

Nesting multiple `try-catch` blocks to handle different logic can make code messy and hard to read. Instead, `x8t` lets you handle each operation individually, keeping your code modular and maintainable.

### 3. **Handling Promises Directly**

With `x8tAsync`, you can pass a direct promise or a promise-returning function as an argument:

```typescript
const myPromise = new Promise((resolve) => resolve("Promise resolved!"));
const { result, error } = await x8tAsync(myPromise, false);
console.log(result); // Output: "Promise resolved!"
```

### 4. **Treating Errors as Values Instead of Throwing Immediately**

Instead of throwing errors, `x8t` captures them as values:

```typescript
const functionWithError = () => {
  throw new Error("Intentional error!");
};
const { result, error } = x8tSync(functionWithError, false);

//The error default is null, and null is falsey, so we can check if there was an error
if (error) {
  console.log("Custom handling for error:", error.message);
  throw error; // If needed to rethrow
}
```

### 5. **Strong TypeScript Support**

Explicitly typing results improves TypeScript support:

```typescript
type User = {
  email: string;
  name: string;
};

const { result, error } = x8tSync<User>(getUser, false);

if (error) {
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
# or
bun add x8t
```

> Built-in TypeScript Support
> No need to install additional @types packages. x8t includes full TypeScript typings out of the box.

## Usage

### **Synchronous Example**

```typescript
const successFunction = () => "Synchronous Success";

const { result, error } = x8tSync(
  successFunction, // Synchronous function
  true, // Enable logging
  true // Include returned result in logs
);

if (error) {
  console.log("Handling error as a value:", error.message);
}
```

### **Asynchronous Example**

```typescript
const successFunction = async () => "Asynchronous Success";

const { result, error, executionTime } = await x8tAsync(
  successFunction, // Asynchronous function
  true, // Enable logging
  true // Include returned result in logs
);
```

## Logging

Logging is enabled by default but minimizes unnecessary output unless specified.

```typescript
import { x8tAsync } from "x8t";

const asyncWithError = async () => {
  throw new Error("API Error!");
};

(async () => {
  await x8tAsync(
    asyncWithError,
    true // Enable logging
  );
})();
```

## Options

| Option          | Type       | Required | Default | Description                                                           |
| --------------- | ---------- | -------- | ------- | --------------------------------------------------------------------- |
| `yourFunction`  | `Function` | ✅       | –       | The function to execute. Required in both `x8tSync` and `x8tAsync`.   |
| `enableLogging` | `boolean`  | ❌       | `false` | Whether to log success or failure details to the console or terminal. |
| `includeResult` | `boolean`  | ❌       | `false` | If true, also logs the return value of the function.                  |

## Behavior Summary

Both `x8tSync` and `x8tAsync` accept the same parameters:

```typescript
const enableLogging = true;
const includeResult = true;

x8tSync(func, enableLogging, includeResult);
x8tAsync(func, enableLogging, includeResult);
```

### Parameters:

- `yourFunction`: The function to execute.
- `enableLogging`: Required. If true, logs a message indicating whether the function succeeded or failed, along with its execution time.
- `includeResult`: Optional. If true, logs the return value of the function.

### Log Format:

Example success log:

```bash
[X8T SUCCESS - 2025-05-11T07:26:51.407Z] Function "myFunction" executed in 0ms
```

Example failure log:

```bash
[X8T ERROR - 2025-05-11T07:26:51.407Z] Function "myFunction" failed in 1ms - Error: ...
```

If `includeResult` is true, it also logs:

```bash
[X8T RESULT] Return value: ...
```

## Return Value

| Name            | Type            | Description                                                             |
| --------------- | --------------- | ----------------------------------------------------------------------- |
| `result`        | `T`             | The return value of the executed function.                              |
| `error`         | `Error \| null` | If an error occurred, this contains the error object. Otherwise `null`. |
| `executionTime` | `number`        | Time taken to execute the function in milliseconds.                     |

## Sync vs Async

- Executes a synchronous function and returns:

```typescript
const { result, error, executionTime } = x8tSync(func, true, false);
```

- Executes an asynchronous function and returns a `Promise` resolving to:

```typescript
const { result, error, executionTime } = await x8tAsync(func, true, false);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

[Marvin Ronquillo](https://github.com/mondejarmarron18)
