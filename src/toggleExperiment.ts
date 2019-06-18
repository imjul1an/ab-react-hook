import URL from "url-parse";

interface Experiment {
  [key: string]: string | undefined;
}

const getQueryExperiments = (et: string): Experiment =>
  et
    ? et.split(",").reduce((exps, exp) => {
        const [expId, expVariant] = exp.split(":");
        exps[expId] = expVariant;
        return exps;
      }, {} as Experiment)
    : {};

export const getBrowserQueryExperimentNames = (search?: string): Experiment => {
  search = typeof window === "undefined" ? "" : window.location.search;
  const { et = "" } = URL.qs.parse(search) as Record<string, string>;
  return getQueryExperiments(et);
};
