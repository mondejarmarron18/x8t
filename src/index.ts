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
  fn: () => Promise<ResultType>,
  options?: X8TOptions
) => {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();

    if (options?.log) logExecution(fn.name || "anonymous", end - start);

    return {
      result,
      error: null,
      executionTime: `${Math.round(end - start)}ms`,
    };
  } catch (error) {
    const end = performance.now();

    if (options?.log) logExecution(fn.name || "anonymous", end - start, error);

    return {
      result: null,
      error,
      executionTime: `${Math.round(end - start)}ms`,
    };
  }
};

// Synchronous function
export const x8tSync: X8TSync = <ResultType>(
  fn: () => ResultType,
  options?: X8TOptions
) => {
  const start = performance.now();
  try {
    const result = fn();
    const end = performance.now();

    if (options?.log) logExecution(fn.name || "anonymous", end - start);

    return {
      result,
      error: null,
      executionTime: `${Math.round(end - start)}ms`,
    };
  } catch (error) {
    const end = performance.now();

    if (options?.log) logExecution(fn.name || "anonymous", end - start, error);

    return {
      result: null,
      error,
      executionTime: `${Math.round(end - start)}ms`,
    };
  }
};
