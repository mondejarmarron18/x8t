import { X8TAsync, X8TOptions, X8TSync } from "./types/x8t.type";
import fs from "fs";

const logExecution = (
  fnName: string,
  executionTime: number,
  result: unknown,
  isError: boolean = false,
  includeResult: X8TOptions["logResult"] = false,
  logToFile: X8TOptions["logToFile"]
): void => {
  const status = isError ? "failed" : "executed";
  const roundedTime = Math.round(executionTime);
  const currentTime = new Date().toISOString();
  const logHead = `[X8T ${isError ? "ERROR" : "SUCCESS"} - ${currentTime}]`;
  const message = `${logHead} Function "${fnName}" ${status} in ${roundedTime}ms`;

  if (logToFile?.path) {
    const debugInfo =
      isError || logToFile.logResult ? `Debug Info: ${result}\n` : "";
    fs.appendFileSync(logToFile.path, `${message}\n${debugInfo}`, "utf8");
  }

  const colorCode = isError ? "31" : "32"; // Red for errors, Green for success
  console.log(`\x1b[${colorCode}m${message}\x1b[0m`);

  if (isError || includeResult) {
    console.log(`\x1b[36mDebug Info:\x1b[0m`, result);
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
      result: null,
      error,
      executionTime: `${executionTime}ms`,
    };
  }
};
