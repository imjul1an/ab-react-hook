import { useEffect, useState } from "react";
import { NONE_VARIANT } from "./constants";
import { ExperimentResultAsync } from "./interfaces";

export default function useExperimentAsyc(
  asyncFn: (...args: any[] | []) => Promise<any>,
  logger: any = console
): ExperimentResultAsync {
  const [variant, setVariant] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
        try {
          setLoading(true);
          const variant = await asyncFn();
          setVariant(variant);
          setLoading(false);
        } catch (err) {
          logger.error(err);
          setLoading(false);
          setVariant(NONE_VARIANT);
        }
      })();
  }, [asyncFn, logger]);

  return { variant, isLoading };
}
