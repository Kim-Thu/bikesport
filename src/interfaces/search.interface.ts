export type SearchFormVariant = "default" | "desktop" | "mobile";

export interface SearchFormProps {
  action?: string;
  placeholder?: string;
  variant?: SearchFormVariant;
  defaultValue?: string;
  submitLabel?: string;
}
