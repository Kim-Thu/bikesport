import type { ComboRecord } from "@/interfaces/combo.interface";

export interface ComboDataSource {
  getById(comboId: string): Promise<ComboRecord | null>;
  getActive(limit?: number): Promise<ComboRecord[]>;
  getFeatured(limit?: number): Promise<ComboRecord[]>;
}
