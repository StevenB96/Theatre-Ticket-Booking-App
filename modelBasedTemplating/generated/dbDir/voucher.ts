// src/library/db/voucher.ts
const db = require('../dbClient');
import type {
  Voucher,
  CreateVoucherInput,
  UpdateVoucherInput,
} from '@/types/voucher';

// Get all vouchers
export async function getAllVouchers(): Promise<Voucher[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Voucher>('voucher')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    )
    .orderBy('id', 'asc');
}

// Get one voucher by ID
export async function getVoucherById(
  id: number
): Promise<Voucher | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Voucher>('voucher').where({ id }).first();
}

// Create a new voucher
export async function createVoucher(
  input: CreateVoucherInput
): Promise<Voucher> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newVoucher] = await db<Voucher>('voucher')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. status: input.status,
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return newVoucher;
}

// Update an existing voucher
export async function updateVoucher(
  id: number,
  data: UpdateVoucherInput
): Promise<Voucher> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedVoucher] = await db<Voucher>('voucher')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return updatedVoucher;
}

// Delete an existing voucher
export async function deleteVoucher(id: number): Promise<void> {
  await db('voucher').where({ id }).del();
}