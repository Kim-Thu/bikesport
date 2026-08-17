import type { CardProps } from "@/interfaces/card.interface";

export interface ProductCollectionItem extends Omit<CardProps, "template"> {
  _key: string;
}
