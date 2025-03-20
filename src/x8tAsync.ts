import { X8TAsync, X8TOptions } from "./types/x8t.type";
import logExecution from "./utils/logExecution";

// Asynchronous function
const x8tAsync: X8TAsync = async <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  options?: X8TOptions
) => {
  const start = performance.now();

  const log = (result: unknown, isError: boolean = false) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";

    if (options?.log) {
      logExecution(
        fnName,
        end - start,
        result,
        isError,
        options?.logResult,
        options?.logToFile
      );
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
      result: null as ResultType,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};

export default x8tAsync;
