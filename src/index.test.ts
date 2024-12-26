import { x8tAsync, x8tSync } from ".";

const mockApiSuccess = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: "API Data Success" }), 100)
  );
};

// Mocking a failing API call
const mockApiFailure = async () => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("API Error!")), 100)
  );
};

jest.mock("axios");

describe("x8tAsync and x8tSync functions", () => {
  // Success case test for async API call
  it("x8tAsync: should return the result when the API call succeeds", async () => {
    const { result, error } = await x8tAsync(mockApiSuccess);

    expect({ result, error }).toEqual({
      result: { data: "API Data Success" },
      error: null,
    });
  });

  // Error case test for async API call
  it("x8tAsync: should return the error when the API call fails", async () => {
    const { result, error } = await x8tAsync(mockApiFailure);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("API Error!"),
    });
  });

  // Success case test for async function
  it("x8tAsync: should return the result when the async function succeeds", async () => {
    const successFn = async () => "Operation Successful!";

    const { result, error } = await x8tAsync(successFn);

    expect({ result, error }).toEqual({
      result: "Operation Successful!",
      error: null,
    });
  });

  // Error case test for async function
  it("x8tAsync: should return the error when the async function throws an error", async () => {
    const errorFn = async () => {
      throw new Error("Something went wrong!");
    };

    const { result, error } = await x8tAsync(errorFn);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("Something went wrong!"),
    });
  });

  // Test synchronous function success
  it("x8tSync: should return the result when a synchronous function succeeds", () => {
    const syncSuccessFn = () => "Synchronous Success";

    const { result, error } = x8tSync(syncSuccessFn);

    expect({ result, error }).toEqual({
      result: "Synchronous Success",
      error: null,
    });
  });

  // Test synchronous function error
  it("x8tSync: should return the error when a synchronous function throws an error", () => {
    const syncErrorFn = () => {
      throw new Error("Sync Error!");
    };

    const { result, error } = x8tSync(syncErrorFn);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("Sync Error!"),
    });
  });

  // Test synchronous function execution time
  it("x8tSync: should return the execution time when a synchronous function is executed", () => {
    const syncSuccessFn = () => "Synchronous Success";

    const { executionTime } = x8tSync(syncSuccessFn);

    expect(executionTime).toMatch(/^[0-9]+ms$/);
  });

  // Test promise success
  it("x8tAsync: should return the result when a promise succeeds", async () => {
    const mockPromiseSuccess = new Promise((resolve) =>
      setTimeout(() => resolve("Promise Data Success"), 100)
    );

    const { result, error } = await x8tAsync(mockPromiseSuccess);

    expect({ result, error }).toEqual({
      result: "Promise Data Success",
      error: null,
    });
  });

  // Test promise error
  it("x8tAsync: should return the error when a promise fails", async () => {
    const mockPromiseFailure = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Promise Error!")), 100)
    );

    const { result, error } = await x8tAsync(mockPromiseFailure);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("Promise Error!"),
    });
  });
});
