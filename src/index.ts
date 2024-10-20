import { X8T } from "./types/x8t.type";

const logExecution = (
  fnName: string,
  executionTime: number,
  error?: unknown
) => {
  const functionName = fnName || "anonymous";
  const status = error ? "failed" : "succeeded";

  const message = `Function "${functionName}" ${status} in ${executionTime}ms`;

  if (error) {
    console.error(message);
    console.error(error);
  } else {
    console.log(message);
  }
};

const x8t: X8T = async (fn, options) => {
  const start = performance.now();
  try {
    const end = performance.now();
    const result = await fn();

    if (options?.log) logExecution(fn.name, end - start);

    return {
      error: null,
      result,
      executionTime: `${end - start}ms`,
    };
  } catch (error) {
    const end = performance.now();

    if (options?.log) logExecution(fn.name, end - start, error);

    return {
      error,
      result: null,
      executionTime: `${end - start}ms`,
    };
  }
};

export default x8t;
