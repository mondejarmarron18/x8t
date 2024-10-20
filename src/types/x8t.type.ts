export type X8TOptions = {
  log?: boolean;
};

export type X8TFunctionArg<Result> = () => Promise<Result> | Result;

export type X8TResult<Result> = {
  result: Result;
  error: null;
};

export type X8TError = {
  result: null;
  error: unknown;
};

export type X8TReturn<Result> = Promise<
  (X8TResult<Result> | X8TError) & {
    executionTime: `${number}ms`;
  }
>;

export type X8T = <Result>(
  fn: X8TFunctionArg<Result>,
  options?: X8TOptions
) => X8TReturn<Result>;
