import { useEffect, useState } from "react";
import { NONE_VARIANT } from "./constants";
import { ExperimentResultAsync, Variant } from "./interfaces";

export default function useExperimentAsyc(
  asyncFn: (...args: any[] | []) => Promise<any>,
  logger: any = console
): ExperimentResultAsync {
  const [variant, setVariant] = useState<Variant>({ name: undefined, weight: undefined });
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
        try {
          setLoading(true);
          const { name, weight } = await asyncFn();
          setVariant({ name, weight });
          setLoading(false);
        } catch (err) {
          logger.error(err);
          setLoading(false);
          setVariant({ name: NONE_VARIANT, weight: undefined });
        }
      })();
  }, [asyncFn, logger]);

  return { variant, isLoading };
}
