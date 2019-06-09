import crc32 from "fbjs/lib/crc32";
import { NONE_VARIANT } from "./constants";
import { ExperimentConfig, Variant } from "./interfaces";

export const generateWeightedVariant = (
  options: ExperimentConfig,
  logger: any = console
): Variant => {
  const { id, name, variants } = options;
  if (variants.length < 2) {
    /*
     * ✅Experiment configuration check.
     *
     * At least two variants should be provided (e.g. A and B).
     */
    logger.warn(
      `WARN: There are should be at least TWO experiment variants and you have: ${
        variants.length
      }.`
    );

    return { name: NONE_VARIANT, weight: undefined };
  }

  const weightSum = variants.reduce((acc, variant) => acc + variant.weight, 0);

  if (weightSum !== 100) {
    /*
     * ✅Experiment configuration check.
     *
     * The total sum of variants weight should be equal to 100.
     * If the sum is not equal to 100, return noneVariant to indicate
     * experiment missconfiguration.
     */
    const sign = weightSum < 100 ? "less" : "more";

    logger.warn(
      `WARN: Your total variant weight is ${sign} than 100.` +
        " " +
        "Make sure your experiemnt configuration is correct."
    );

    return { name: NONE_VARIANT, weight: undefined };
  }

  const bucket = Math.abs(crc32(`${id}${name}`) % weightSum);
  const variant = findVariant(0, bucket, variants, logger);

  return { name: variant.name, weight: variant.weight };
};

const findVariant = (
  currentBucket: number,
  initialBucket: number,
  variants: Variant[],
  logger: any = console
): Variant => {
  const variant = variants.shift() as Variant;

  return initialBucket < currentBucket + variant.weight || !variants.length
    ? variant
    : findVariant(currentBucket + variant.weight, initialBucket, variants, logger);
};
