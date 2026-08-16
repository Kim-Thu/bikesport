export interface PaymentMethod {
  _id: string;
  name: string;
  label: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
  enabled?: boolean;
  order?: number;
}

export interface PaymentProps {
  className?: string;
  itemClassName?: string;
  imageClassName?: string;
}
