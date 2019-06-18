import { useEffect, useState } from "react";

import { ExperimentConfig, ExperimentResult, Variant } from "./interfaces";
import { generateWeightedVariant } from "./randomizer";
import { getBrowserQueryExperimentNames } from "./toggleExperiment";

const useExperiment = (
  config: ExperimentConfig,
  logger: any = console,
): ExperimentResult => {
  const { id, name, variants, enableForceExperiment } = config;

  const [variant, setVariant] = useState<Variant>({ name: undefined, weight: undefined });

  useEffect(() => {
    let forcedExperiments;
    let forcedVariant;

    if (enableForceExperiment) {
      forcedExperiments = getBrowserQueryExperimentNames();
      forcedVariant = forcedExperiments[name];

      if (forcedVariant) {
        setVariant({ name: forcedVariant, weight: undefined });
        return;
      }
    }

    const variant = generateWeightedVariant(
      {
        id,
        name,
        variants
      } as ExperimentConfig,
      logger
    );

    setVariant(variant);
  }, [id, name, variants, logger, enableForceExperiment]);

  return { variant };
};

export default useExperiment;
