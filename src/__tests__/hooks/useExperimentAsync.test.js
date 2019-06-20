import { act, renderHook } from "react-hooks-testing-library";
import useExperimentAsync from "../../useExperimentAsync";

describe("useExperimentAsync", () => {
  const fetchVariantFulfilled = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve("test");
      }, 500);
    });

  const fetchVariantRejected = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 500);
    });

  it("when fetching variant set 'isLoading' to TRUE", () => {
    let hook;

    act(() => {
      hook = renderHook(() =>
        useExperimentAsync({
          name: "exp1",
          fetchVariant: fetchVariantFulfilled
        })
      );
    });

    expect(hook.result.current.isLoading).toBeTruthy();
  });

  it("when variant is resolved set 'isLoading' to FALSE", async () => {
    let hook;

    act(() => {
      hook = renderHook(() =>
        useExperimentAsync({
          name: "exp1",
          fetchVariant: fetchVariantFulfilled
        })
      );
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
  });

  it("fetch variant with success - resolve", async () => {
    let hook;

    act(() => {
      hook = renderHook(() =>
        useExperimentAsync({
          name: "exp1",
          fetchVariant: fetchVariantFulfilled
        })
      );
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(hook.result.current.variant).toEqual("test");
  });

  it("fetch variant with failure - reject", async () => {
    let hook;

    act(() => {
      hook = renderHook(() =>
        useExperimentAsync({
          name: "exp1",
          fetchVariant: fetchVariantRejected
        })
      );
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(hook.result.current.variant).toEqual("noneVariant");
  });

  it("fetch forced variant from the url", async () => {
    jsdom.reconfigure({
      url: "https://example.com?et=exp1:super_test"
    });

    let hook;

    act(() => {
      hook = renderHook(() =>
        useExperimentAsync({
          name: "exp1",
          fetchVariant: fetchVariantFulfilled,
          enableForceExperiment: true
        })
      );
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(hook.result.current.variant).toEqual("super_test");
  });
});
