import x8t from ".";

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

describe("x8t function", () => {
  // Success case test for API call
  it("should return the result when the API call succeeds", async () => {
    const { result, error } = await x8t(mockApiSuccess);

    expect({ result, error }).toEqual({
      result: { data: "API Data Success" },
      error: null,
    });
  });

  // Error case test for API call
  it("should return the error when the API call fails", async () => {
    const { result, error } = await x8t(mockApiFailure);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("API Error!"),
    });
  });

  // Success case test
  it("should return the result when the function succeeds", async () => {
    const successFn = async () => "Operation Successful!";

    const { result, error } = await x8t(successFn);

    expect({ result, error }).toEqual({
      result: "Operation Successful!",
      error: null,
    });
  });

  // Error case test
  it("should return the error when the function throws an error", async () => {
    const errorFn = async () => {
      throw new Error("Something went wrong!");
    };

    const { result, error } = await x8t(errorFn);

    expect({ result, error }).toEqual({
      result: null,
      error: new Error("Something went wrong!"),
    });
  });

  // Test synchronous function success
  it("should return the result when a synchronous function succeeds", async () => {
    const syncSuccessFn = () => "Synchronous Success";

    const { result, error } = await x8t(syncSuccessFn);

    expect({ result, error }).toEqual({
      result: "Synchronous Success",
      error: null,
    });
  });

  // Test synchronous function error
  it("should return the error when a synchronous function throws an error", async () => {
    const syncErrorFn = () => {
      throw new Error("Sync Error!");
    };

    const { error } = await x8t(syncErrorFn);

    expect(error).toEqual(new Error("Sync Error!"));
  });

  // Get synchronous function execution time
  it("should return the execution time when a synchronous function is executed", async () => {
    const syncSuccessFn = () => {
      return new Promise((resolve) =>
        setTimeout(() => resolve("Synchronous Success"), 100)
      );
    };

    const { executionTime } = await x8t(syncSuccessFn);

    expect(executionTime).toMatch(/^[0-9.]+ms$/);
  });
});
