import attributeData from "@/data/wp-attribute.json";
import type { AttributeDataSource } from "@/data-access/contracts/attribute-data-source.interface";
import type { AttributeRecord } from "@/interfaces/attribute.interface";

const attributes = attributeData.attributes as AttributeRecord[];
const attributeById = new Map(attributes.map((attribute) => [attribute._id, attribute]));

export const jsonAttributeDataSource: AttributeDataSource = {
  async getById(id) {
    return attributeById.get(id) ?? null;
  },
  async getActive() {
    return attributes.filter((attribute) => attribute.status === "active");
  },
  async getActiveBySlug(slug) {
    return (
      attributes.find(
        (attribute) => attribute.slug === slug && attribute.status === "active",
      ) ?? null
    );
  },
};
