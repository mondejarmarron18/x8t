export type X8TOptions = {
  log?: boolean;
  logResult?: boolean;
};

export type X8TExecutionTime = `${number}ms`;

export type X8TResult<ResultType> = {
  result: ResultType;
  error: null;
  executionTime: X8TExecutionTime;
};

export type X8TError = {
  result: null;
  error: unknown;
  executionTime: X8TExecutionTime;
};

export type X8TSync = <ResultType>(
  fn: () => ResultType,
  options?: X8TOptions
) => X8TResult<ResultType> | X8TError;

export type X8TAsync = <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  options?: X8TOptions
) => Promise<X8TResult<ResultType> | X8TError>;
