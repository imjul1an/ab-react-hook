import { renderHook } from "react-hooks-testing-library";

import useExperiment from "../../useExperiment";

describe("useExperiment", () => {
  let experimentConfig;

  beforeEach(() => {
    experimentConfig = {
      id: "31410601021",
      name: "exp1",
      variants: [{ name: "control", weight: 99 }, { name: "test", weight: 1 }]
    };
  });

  it("should return weighted variant", () => {
    const hook = renderHook(() => useExperiment(experimentConfig));
    const variant = hook.result.current;

    expect(variant).toEqual({ name: "control", weight: 99 });
  });

  it("should return forced variant", () => {
    jsdom.reconfigure({
      url: "https://example.com?et=exp1:test"
    });

    const hook = renderHook(() =>
      useExperiment({ ...experimentConfig, enableForceExperiment: true })
    );

    const { name } = hook.result.current;

    expect(name).toEqual("test");
  });

  it("should return default config variant when forced exp name is wrong", () => {
    jsdom.reconfigure({
      url: "https://example.com?et=exp_wrong:test"
    });

    const hook = renderHook(() =>
      useExperiment({ ...experimentConfig, enableForceExperiment: true })
    );

    const { name } = hook.result.current;

    expect(name).toEqual("control");
  });
});
