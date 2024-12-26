import { X8TAsync, X8TOptions, X8TSync } from "./types/x8t.type";

const logExecution = (
  fnName: string,
  executionTime: number,
  error?: unknown
): void => {
  const functionName = fnName || "anonymous";
  const status = error ? "failed" : "succeeded";
  const roundedTime = Math.round(executionTime);
  const message = `Function "${functionName}" ${status} in ${roundedTime}ms`;

  if (error) {
    console.error(message);
    console.error(error);
  } else {
    console.log(message);
  }
};

// Asynchronous function
export const x8tAsync: X8TAsync = async <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  options?: X8TOptions
) => {
  const start = performance.now();

  const log = (success: boolean, error?: unknown) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";
    if (options?.log) {
      logExecution(fnName, end - start, success ? undefined : error);
    }
    return Math.round(end - start);
  };
  try {
    const result = typeof fn === "function" ? await fn() : await fn;
    const executionTime = log(true);

    return {
      result,
      error: null,
      executionTime: `${executionTime}ms`,
    };
  } catch (error) {
    const executionTime = log(true);
    return {
      result: null,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};

// Synchronous function
export const x8tSync: X8TSync = <ResultType>(
  fn: () => ResultType,
  options?: X8TOptions
) => {
  const start = performance.now();

  const log = (success: boolean, error?: unknown) => {
    const end = performance.now();
    const fnName = fn.name || "anonymous";
    if (options?.log)
      logExecution(fnName, end - start, success ? undefined : error);
    return Math.round(end - start);
  };

  try {
    const result = fn();
    const executionTime = log(true);

    return {
      result,
      error: null,
      executionTime: `${executionTime}ms`,
    };
  } catch (error) {
    const end = performance.now();

    const executionTime = log(true);

    return {
      result: null,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};
