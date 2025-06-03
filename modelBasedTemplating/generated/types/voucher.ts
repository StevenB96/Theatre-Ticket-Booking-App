// src/types/voucher.ts
export interface Voucher {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. id: number;
  */
}

export interface CreateVoucherInput {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. status: number;
  */
}

export interface UpdateVoucherInput extends CreateVoucherInput {
  id: number;
}