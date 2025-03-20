import { X8TOptions, X8TSync } from "./types/x8t.type";
import logExecution from "./utils/logExecution";

// Synchronous function
const x8tSync: X8TSync = <ResultType>(
  fn: () => ResultType,
  options?: X8TOptions
) => {
  const start = performance.now();

  const log = (result: unknown, isError: boolean = false) => {
    const end = performance.now();
    const fnName =
      typeof fn === "function" ? fn.name || "anonymous" : "promise";

    if (!options?.silent) {
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
      result: null as ResultType,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};

export default x8tSync;
