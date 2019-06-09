export interface Variant {
  name: string;
  weight: number;
}

export interface NoneVariant {
  name: string;
}

export interface ExperimentResult {
  variant: Variant;
}

export interface ExperimentResultAsync {
  variant: Variant;
  isLoading?: boolean;
}

export interface ExperimentConfig {
  id: string;
  name: string;
  variants: Variant[];
}
