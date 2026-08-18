export interface PaymentMethod {
  _id: string;
  name: string;
  label: string;
  mediaId: string;
  enabled?: boolean;
  order?: number;
}

export interface PaymentProps {
  className?: string;
  itemClassName?: string;
  imageClassName?: string;
}
