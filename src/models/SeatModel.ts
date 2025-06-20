import * as db from '@/library/db/seat';
import type { Seat, CreateSeatInput, UpdateSeatInput } from '@/types/seat';

export class SeatModel {
  data: Seat | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const seat = await db.getSeatById(this.id);
    this.data = seat ?? null;
  }

  static async list(): Promise<Seat[]> {
    return db.getAllSeats();
  }

  static async create(input: CreateSeatInput): Promise<SeatModel> {
    const newSeat = await db.createSeat(input);
    const model = new SeatModel(newSeat.id);
    model.data = newSeat;
    return model;
  }

  static async find(id: number): Promise<SeatModel | null> {
    const seat = await db.getSeatById(id);
    if (!seat) return null;
    const model = new SeatModel(id);
    model.data = seat;
    return model;
  }

  async update(input: UpdateSeatInput): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No seat loaded');
    const updated = await db.updateSeatById(this.id, input);
    this.data = updated;
  }

  async delete(): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No seat loaded');
    await db.deleteSeatById(this.id);
    this.data = null;
    this.id = null;
  }
}
