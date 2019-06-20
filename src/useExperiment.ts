import { useEffect, useState } from "react";

import isEqual from "lodash.isequal";

import usePrevious from "./usePrevious";

import { ExperimentConfig, Variant } from "./interfaces";
import { generateWeightedVariant } from "./randomizer";
import { getBrowserQueryExperimentNames } from "./toggleExperiment";

const useExperiment = (
  config: ExperimentConfig,
  logger: any = console,
): Variant | undefined => {

  const defaultVariant = {
    name: undefined,
    weight: undefined
  } as Variant;

  const [variant, setVariant] = useState<Variant>(defaultVariant);

  const { id, name, variants, enableForceExperiment } = config;

  const prevConfig = usePrevious([ id, name, variants, enableForceExperiment ]);
  const prevVariant = usePrevious([ variant ]);

  useEffect(() => {
    if (
      isEqual(prevConfig, [
        id,
        name,
        variants,
        enableForceExperiment
      ]) &&
      !isEqual(prevVariant, [defaultVariant])
    ) {
      return;
    }

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
  });

  return variant;
};

export default useExperiment;
