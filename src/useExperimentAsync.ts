import { useEffect, useState } from "react";
import { NONE_VARIANT } from "./constants";
import { ExperimentConfigAsync, ExperimentResultAsync } from "./interfaces";
import { getBrowserQueryExperimentNames } from "./toggleExperiment";

export default function useExperimentAsync(
  config: ExperimentConfigAsync,
  logger: any = console
): ExperimentResultAsync {
  const [variant, setVariant] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const { name, fetchVariant, enableForceExperiment } = config;

  useEffect(() => {
    if (enableForceExperiment) {
      (async () => {
        try {
          const forcedExperiments = getBrowserQueryExperimentNames();
          const forcedVariant = await Promise.resolve(forcedExperiments[name]);

          if (forcedVariant) {
            setLoading(true);
            setVariant(forcedVariant);
            setLoading(false);
            return;
          }
        } catch (err) {
          logger.error(err);
          setLoading(false);
          setVariant(NONE_VARIANT);
        }
      })();
    }

    (async () => {
      try {
        setLoading(true);
        const variant = await fetchVariant();
        setVariant(variant);
        setLoading(false);
      } catch (err) {
        logger.error(err);
        setLoading(false);
        setVariant(NONE_VARIANT);
      }
    })();
  }, [fetchVariant, enableForceExperiment, logger]);

  return { variant, isLoading };
}
