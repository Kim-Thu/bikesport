export const PAYMENT_BRAND_ASSET = {
  mastercard: {
    src: "/uploads/images/payments/mastercard.svg",
    width: 64,
    height: 40,
  },
  zalopay: {
    src: "/uploads/images/payments/zalopay.svg",
    width: 96,
    height: 36,
  },
  momo: {
    src: "/uploads/images/payments/momo.svg",
    width: 64,
    height: 64,
  },
  vnpay: {
    src: "/uploads/images/payments/vnpay.svg",
    width: 64,
    height: 64,
  },
  cod: {
    src: "/uploads/images/payments/cod.svg",
    width: 64,
    height: 64,
  },
} as const;

export type PaymentBrandAssetName = keyof typeof PAYMENT_BRAND_ASSET;

export function resolvePaymentBrandAsset(name: string) {
  return PAYMENT_BRAND_ASSET[name as PaymentBrandAssetName];
}

export const VERIFICATION_BRAND_ASSET = {
  "Đã thông báo Bộ Công Thương": {
    src: "/uploads/images/verification/bo-cong-thuong.svg",
    width: 240,
    height: 92,
  },
} as const;

export type VerificationBrandAssetLabel = keyof typeof VERIFICATION_BRAND_ASSET;

export function resolveVerificationBrandAsset(label: string) {
  return VERIFICATION_BRAND_ASSET[label as VerificationBrandAssetLabel];
}
