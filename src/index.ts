import { X8TAsync, X8TOptions, X8TSync } from "./types/x8t.type";

const logExecution = (
  fnName: string,
  executionTime: number,
  result: unknown,
  isError: boolean = false
): void => {
  const functionName = fnName || "anonymous";
  const status = isError ? "failed" : "succeeded";
  const roundedTime = Math.round(executionTime);
  const message = `Function "${functionName}" ${status} in ${roundedTime}ms`;

  if (isError) {
    console.error({
      message,
      reason: result,
    });
  } else {
    console.log({
      message,
      result,
    });
  }
};

// Asynchronous function
export const x8tAsync: X8TAsync = async <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  options?: X8TOptions
) => {
  const start = performance.now();

  const log = (result: unknown, isError: boolean = false) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";
    if (options?.log) {
      logExecution(fnName, end - start, result, isError);
    }
    return Math.round(end - start);
  };

  try {
    const result = typeof fn === "function" ? await fn() : await fn;
    const executionTime = log(result);

    return {
      result,
      error: null,
      executionTime: `${executionTime}ms`,
    };
  } catch (error) {
    const executionTime = log(error, true);
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

  const log = (result: unknown, isError: boolean = false) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";
    if (options?.log) {
      logExecution(fnName, end - start, result, isError);
    }
    return Math.round(end - start);
  };

  try {
    const result = fn();
    const executionTime = log(result);

    return {
      result,
      error: null,
      executionTime: `${executionTime}ms`,
    };
  } catch (error) {
    const executionTime = log(error, true);

    return {
      result: null,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};
