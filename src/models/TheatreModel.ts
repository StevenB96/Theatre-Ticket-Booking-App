// src/models/TheatreModel.ts

import db from '@/library/dbClient';
import * as theatreDomainFunctions from '@/library/db/theatre';
import type { Theatre, CreateTheatreInput, UpdateTheatreInput } from '@/types/theatre';

export class TheatreModel {
  public data: Theatre;

  constructor(data: Theatre) {
    this.data = data;
  }

  /** Fetch all theatres */
  static async findAll(): Promise<TheatreModel[]> {
    const all = await theatreDomainFunctions.getAllTheatres();
    return all.map((t) => new TheatreModel(t));
  }

  /** Fetch one theatre by ID */
  static async load(id: number): Promise<TheatreModel> {
    const theatre = await theatreDomainFunctions.getTheatreById(id);
    if (!theatre) {
      throw new Error(`Theatre with id ${id} not found`);
    }
    return new TheatreModel(theatre);
  }

  /** Create a new theatre */
  static async create(input: CreateTheatreInput): Promise<TheatreModel> {
    const newTheatre = await theatreDomainFunctions.createTheatre(input);
    return new TheatreModel(newTheatre);
  }

  /** Update an existing theatre */
  static async update(id: number, input: UpdateTheatreInput): Promise<TheatreModel> {
    const updated = await theatreDomainFunctions.updateTheatreById(id, input);
    return new TheatreModel(updated);
  }

  /** Delete a theatre */
  static async delete(id: number): Promise<void> {
    await theatreDomainFunctions.deleteTheatreById(id);
  }

  async getSeatCount(): Promise<number> {
    const result = await db<{
      count: number;
    }>('seat')
      .where('theatre_id', this.data.id)
      .andWhere('status', 1)
      .count<{ count: number }>('id as count')
      .first();

    return Number(result?.count ?? 0);
  }
}
