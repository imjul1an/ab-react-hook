export interface Variant {
  name: string;
  weight: number;
}

export interface NoneVariant {
  name: string;
}
export interface ExperimentConfigAsync {
  name: string;
  fetchVariant: (...args: any[] | []) => Promise<any>;
  enableForceExperiment?: boolean;
}

export interface ExperimentResultAsync {
  variant: string;
  isLoading?: boolean;
}

export interface ExperimentConfig {
  id: string;
  name: string;
  variants: Variant[];
  enableForceExperiment?: boolean;
}
