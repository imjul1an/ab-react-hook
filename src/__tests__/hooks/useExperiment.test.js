import { renderHook } from "react-hooks-testing-library";

import useExperiment from "../../useExperiment";

describe("useExperiment", () => {
  const experimentConfig = {
    id: "31410601021",
    name: "1-billion-dollar-experiment",
    variants: [{ name: "control", weight: 99 }, { name: "test", weight: 1 }]
  };

  it("should return weighted variant", () => {
    const hook = renderHook(() => useExperiment(experimentConfig));
    const { variant } = hook.result.current;

    expect(variant).toEqual({ name: "control", weight: 99 });
  });
});
