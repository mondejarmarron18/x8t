import { X8TAsync } from "./types/x8t.type";
import logExecution from "./utils/logExecution";

// Asynchronous function
const x8tAsync: X8TAsync = async <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  enableLogging: boolean,
  includeResult: boolean = false
) => {
  const start = performance.now();

  const log = (result: unknown, isError: boolean = false) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";

    if (enableLogging) {
      logExecution(fnName, end - start, result, isError, includeResult);
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
