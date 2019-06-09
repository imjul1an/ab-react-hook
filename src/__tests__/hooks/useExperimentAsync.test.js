import { act, renderHook } from "react-hooks-testing-library";
import useExperimentAsync from "../../useExperimentAsync";

describe("useExperimentAsync", () => {
  const variantFetch = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: "test", weight: 60 });
      }, 500);
    });

  const variantFetchError = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 500);
    });

  it("when fetching variant set 'isLoading' to TRUE", () => {
    let hook;

    act(() => {
      hook = renderHook(() => useExperimentAsync(variantFetch));
    });

    expect(hook.result.current.isLoading).toBeTruthy();
  });

  it("when variant is resolved set 'isLoading' to FALSE", async () => {
    let hook;

    act(() => {
      hook = renderHook(() => useExperimentAsync(variantFetch));
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
  });

  it("fetch variant with success - resolve", async () => {
    let hook;

    act(() => {
      hook = renderHook(() => useExperimentAsync(variantFetch));
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(hook.result.current.variant).toEqual({ name: "test", weight: 60 });
  });

  it("fetch variant with failure - reject", async () => {
    let hook;

    act(() => {
      hook = renderHook(() => useExperimentAsync(variantFetchError));
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(hook.result.current.variant).toEqual({
      name: "noneVariant",
      weight: undefined
    });
  });
});
