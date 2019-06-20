import { getBrowserQueryExperimentNames } from "../toggleExperiment";

describe("Force experiment variant", () => {
  it("should return forced variant when defined in a querystring", () => {
    jsdom.reconfigure({
      url: "https://example.com?et=exp1:test"
    });

    expect(window.location.search).toEqual("?et=exp1:test");

    const forcedVariants = getBrowserQueryExperimentNames();
    const variant = forcedVariants["exp1"];

    expect(variant).toEqual("test");
  });

  it("should return undefined variant when variant is not forced", () => {
    jsdom.reconfigure({
      url: "https://example.com"
    });

    const forcedVariants = getBrowserQueryExperimentNames();

    expect(forcedVariants).toEqual({});
  });
});
