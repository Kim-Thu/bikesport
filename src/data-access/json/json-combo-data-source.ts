import comboData from "@/data/wp-combo.json";
import type { ComboDataSource } from "@/data-access/contracts/combo-data-source.interface";
import type { ComboRecord } from "@/interfaces/combo.interface";

const combos = comboData.combos as ComboRecord[];
const comboById = new Map(combos.map((combo) => [combo._id, combo]));
const activeCombos = combos
  .filter((combo) => combo.status === "active")
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
const featuredCombos = activeCombos.filter((combo) => combo.featured === true);

export const jsonComboDataSource: ComboDataSource = {
  async getById(comboId) {
    return comboById.get(comboId) ?? null;
  },
  async getActive(limit) {
    return typeof limit === "number" ? activeCombos.slice(0, limit) : activeCombos;
  },
  async getFeatured(limit) {
    return typeof limit === "number" ? featuredCombos.slice(0, limit) : featuredCombos;
  },
};
