export type X8TExecutionTime = `${number}ms`;

export type X8TResult<ResultType> = {
  result: ResultType;
  error: null;
  executionTime: X8TExecutionTime;
};

export type X8TError<ResultType> = {
  result: ResultType;
  error: unknown;
  executionTime: X8TExecutionTime;
};

export type X8TSync = <ResultType>(
  fn: () => ResultType,
  enableLogging: boolean,
  includeResult?: boolean
) => X8TResult<ResultType> | X8TError<ResultType>;

export type X8TAsync = <ResultType>(
  fn: Promise<ResultType> | (() => Promise<ResultType>),
  enableLogging: boolean,
  includeResult?: boolean
) => Promise<X8TResult<ResultType> | X8TError<ResultType>>;
