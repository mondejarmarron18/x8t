import fs from "fs";
import { X8TOptions } from "../types/x8t.type";

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

export default logExecution;
