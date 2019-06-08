import { useEffect, useState } from "react";
import {
  generateWeightedVariant,
  RandomizerOptions,
  Variant
} from "./randomizer";

export interface ExperimentOptions extends RandomizerOptions {
  fetchVariant?: (...args: any | []) => any;
  fallbackVariant?: string;
}

export interface ExperimentResult {
  variant: Variant;
  isLoading?: boolean;
}

const useExperiment = (
  options: ExperimentOptions,
  logger: any = console
): ExperimentResult => {
  const { id, name, variants, fetchVariant, fallbackVariant } = options;

  const [variant, setVariant] = useState<Variant>({ name: "", weight: 0 });
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const variant = generateWeightedVariant(
      {
        id,
        name,
        variants
      } as RandomizerOptions,
      logger
    );
    setLoading(true); // will be removed soon, as of now we keep it to be consistent with prev API

    setVariant(variant);

    setLoading(false); // will be removed soon, as of now we keep it to be consistent with prev API
  }, [id, name, variants, fetchVariant, fallbackVariant, logger]);

  return { variant, isLoading };
};

export default useExperiment;
