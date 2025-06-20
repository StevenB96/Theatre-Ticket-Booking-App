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

  static async update(id: number, input: UpdateSeatInput): Promise<SeatModel> {
    const updated = await db.updateSeatById(id, input);
    const model = new SeatModel(id);
    model.data = updated;
    return model;
  }

  static async delete(id: number): Promise<void> {
    await db.deleteSeatById(id);
  }
}
