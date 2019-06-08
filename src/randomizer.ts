import crc32 from "fbjs/lib/crc32";

export const NONE_VARIANT = "noneVariant";

export interface Variant {
  name: string;
  weight: number;
};

export interface RandomizerOptions {
  id: string,
  name: string,
  variants: Array<Variant>
}

export interface NoneVariant {
  name: string
}

export const generateWeightedVariant = (
  options: RandomizerOptions, 
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

    return { name: NONE_VARIANT, weight: 0 };
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
        "Please make sure your experiemnt configuration is correct."
    );

    return { name: NONE_VARIANT, weight: 0 };
  }

  const bucket = Math.abs(crc32(`${id}${name}`) % weightSum);

  const variant = findVariant(0, bucket, variants, logger);

  return { name: variant.name, weight: variant.weight };
};

const findVariant = (
  currentBucket: number,
  initialBucket: number,
  variants: Array<Variant>,
  logger: any = console
): Variant => {
  if (variants.length === 0) {
    logger.warn("WARN: No variant found that is in the range of bucket size.");

    return { name: NONE_VARIANT, weight: 0 };
  }

  const variant = variants.shift() as Variant;

  return initialBucket < currentBucket + variant.weight || !variants.length
    ? variant
    : findVariant(currentBucket + variant.weight, initialBucket, variants, logger)
};
