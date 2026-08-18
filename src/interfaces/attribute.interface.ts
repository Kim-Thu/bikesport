export type AttributeDisplay = "select" | "swatch" | "button";

export interface AttributeOption {
  _id: string;
  label: string;
  value: string;
}

export interface AttributeRecord {
  _id: string;
  type: "product";
  name: string;
  slug: string;
  display: AttributeDisplay;
  options: AttributeOption[];
  status: "active" | "inactive";
}
