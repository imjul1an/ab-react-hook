import uuidv4 from "uuid/v4";

import { generateWeightedVariant } from "../randomizer";

describe("Randomization algorithm for weighted variants", () => {
  let n;
  beforeAll(() => {
    /*
     * Increase "n", to have larger destribution (e.g. 1K or 10K or 100K or 1M).
     * ⛔ ATTENTION ⛔: large number is not recommended because it would increase a time to
     * run all tests. 1M would take +/- 15sec.
     */
    n = 100;
  });

  describe("A/B: randomisation algorithm output should be reasonable.", () => {
    it("50/50 split", () => {
      const { isErrorRateLte1Precent } = calcABVariantWeights(
        {
          weightA: 50,
          weightB: 50
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("60/40 split", () => {
      const { isErrorRateLte1Precent } = calcABVariantWeights(
        {
          weightA: 60,
          weightB: 40
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("80/20 split", () => {
      const { isErrorRateLte1Precent } = calcABVariantWeights(
        {
          weightA: 80,
          weightB: 20
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("99/1 split", () => {
      const { isErrorRateLte1Precent } = calcABVariantWeights(
        {
          weightA: 99,
          weightB: 1
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });
  });

  describe("A/B/C: randomisation algorithm output should be reasonable", () => {
    it("33/33/33 split", () => {
      const { isErrorRateLte1Precent } = calcABCVariantWeights(
        {
          weightA: 33,
          weightB: 33,
          weightC: 34
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("60/20/20 split", () => {
      const { isErrorRateLte1Precent } = calcABCVariantWeights(
        {
          weightA: 60,
          weightB: 20,
          weightC: 20
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("40/40/20 split", () => {
      const { isErrorRateLte1Precent } = calcABCVariantWeights(
        {
          weightA: 40,
          weightB: 40,
          weightC: 20
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });

    it("80/10/10 split", () => {
      const { isErrorRateLte1Precent } = calcABCVariantWeights(
        {
          weightA: 40,
          weightB: 40,
          weightC: 20
        },
        n
      );

      expect(isErrorRateLte1Precent).toBeTruthy();
    });
  });
});

const calcABVariantWeights = ({ weightA, weightB }, n) => {
  const assignedVariants = [];

  for (let index = 0; index < n; index++) {
    let variant = generateWeightedVariant({
      id: `${uuidv4()}`,
      name: "experiment",
      variants: [
        {
          name: "a",
          weight: weightA
        },
        {
          name: "b",
          weight: weightB
        }
      ]
    });

    assignedVariants.push(variant.name);
  }

  const vAFraction = assignedVariants.filter(v => v === "a").length / n;
  const vBFraction = assignedVariants.filter(v => v === "b").length / n;

  const weight = Math.sqrt((weightA * weightB) / n);

  // with 99.7% probability for Variant A: p - 3 * s < f < p + 3 * s
  const p99A =
    weightA - 3 * weight < vAFraction < weightA < weightA + 3 * weight;
  // with 99.7% probability for Variant B: p - 3 * s < f < p + 3 * s
  const p99B =
    weightB - 3 * weight < vBFraction < weightB < weightB + 3 * weight;

  // Calculate error rate for variant A. error = (approx - exact) / exact;
  const vAErrorRate = (100 - vAFraction) / 100;

  // Calculate error rate for variant B. error = (approx - exact) / exact;
  const vBErrorRate = (100 - vBFraction) / 100;

  // Error rate must be less or equal to 1%
  const isErrorRateLte1Precent = vAErrorRate <= 1 && vBErrorRate <= 1;

  return {
    isErrorRateLte1Precent,
    vAFraction,
    vBFraction,
    vAErrorRate,
    vBErrorRate,
    p99A,
    p99B
  };
};

const calcABCVariantWeights = ({ weightA, weightB, weightC }, n) => {
  const assignedVariants = [];

  for (let index = 0; index < n; index++) {
    let variant = generateWeightedVariant({
      id: `${uuidv4()}`,
      name: "experiment",
      variants: [
        {
          name: "a",
          weight: weightA
        },
        {
          name: "b",
          weight: weightB
        },
        {
          name: "c",
          weight: weightC
        }
      ]
    });

    assignedVariants.push(variant.name);
  }

  const vAFraction = assignedVariants.filter(v => v === "a").length / n;
  const vBFraction = assignedVariants.filter(v => v === "b").length / n;
  const vCFraction = assignedVariants.filter(v => v === "c").length / n;

  const weight = Math.sqrt((weightA * weightB * weightC) / n);

  // with 99.7% probability for Variant A: p - 3 * s < f < p + 3 * s
  const p99A =
    weightA - 3 * weight < vAFraction < weightA < weightA + 3 * weight;
  // with 99.7% probability for Variant B: p - 3 * s < f < p + 3 * s
  const p99B =
    weightB - 3 * weight < vBFraction < weightB < weightB + 3 * weight;
  // with 99.7% probability for Variant C: p - 3 * s < f < p + 3 * s
  const p99C =
    weightC - 3 * weight < vCFraction < weightC < weightC + 3 * weight;

  // Calculate error rate for variant A. error = (approx - exact) / exact;
  const vAErrorRate = (100 - vAFraction) / 100;
  // Calculate error rate for variant B. error = (approx - exact) / exact;
  const vBErrorRate = (100 - vBFraction) / 100;
  // Calculate error rate for variant C. error = (approx - exact) / exact;
  const vCErrorRate = (100 - vCFraction) / 100;

  // Error rate must be less or equal to 1%
  const isErrorRateLte1Precent =
    vAErrorRate <= 1 && vBErrorRate <= 1 && vCErrorRate <= 1;

  return {
    isErrorRateLte1Precent,
    vAFraction,
    vBFraction,
    vCFraction,
    vAErrorRate,
    vBErrorRate,
    vCErrorRate,
    p99A,
    p99B,
    p99C
  };
};
