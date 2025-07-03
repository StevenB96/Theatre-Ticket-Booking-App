// src/models/SeatModel.ts
import * as seatDomainFunctions from '@/library/db/seat';
import type { Seat, CreateSeatInput, UpdateSeatInput } from '@/types/seat';

export class SeatModel {
  public data: Seat;

  constructor(data: Seat) {
    this.data = data;
  }

  /** Fetch all seats */
  static async findAll(): Promise<SeatModel[]> {
    const seats = await seatDomainFunctions.getAllSeats();
    return seats.map((s) => new SeatModel(s));
  }

  /** Fetch one seat by ID */
  static async load(id: number): Promise<SeatModel> {
    const seat = await seatDomainFunctions.getSeatById(id);
    if (!seat) {
      throw new Error(`Seat with id ${id} not found`);
    }
    return new SeatModel(seat);
  }

  /** Create a new seat */
  static async create(input: CreateSeatInput): Promise<SeatModel> {
    const newSeat = await seatDomainFunctions.createSeat(input);
    return new SeatModel(newSeat);
  }

  /** Update an existing seat */
  static async update(id: number, input: UpdateSeatInput): Promise<SeatModel> {
    const updated = await seatDomainFunctions.updateSeatById(id, input);
    return new SeatModel(updated);
  }

  /** Delete a seat */
  static async delete(id: number): Promise<void> {
    await seatDomainFunctions.deleteSeatById(id);
  }
}
