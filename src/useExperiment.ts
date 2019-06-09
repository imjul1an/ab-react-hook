import { useEffect, useState } from "react";

import { ExperimentConfig, ExperimentResult, Variant } from "./interfaces";
import { generateWeightedVariant } from "./randomizer";

const useExperiment = (
  config: ExperimentConfig,
  logger: any = console
): ExperimentResult => {
  const { id, name, variants } = config;

  const [variant, setVariant] = useState<Variant>({ name: "", weight: 0 });

  useEffect(() => {
    const variant = generateWeightedVariant(
      {
        id,
        name,
        variants
      } as ExperimentConfig,
      logger
    );

    setVariant(variant);
  }, [id, name, variants, logger]);

  return { variant };
};

export default useExperiment;
