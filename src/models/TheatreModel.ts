import * as db from '@/library/db/theatre';
import type { Theatre, CreateTheatreInput, UpdateTheatreInput } from '@/types/theatre';

export class TheatreModel {
  data: Theatre | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const theatre = await db.getTheatreById(this.id);
    this.data = theatre ?? null;
  }

  static async list(): Promise<Theatre[]> {
    return db.getAllTheatres();
  }

  static async create(input: CreateTheatreInput): Promise<TheatreModel> {
    const newTheatre = await db.createTheatre(input);
    const model = new TheatreModel(newTheatre.id);
    model.data = newTheatre;
    return model;
  }

  static async find(id: number): Promise<TheatreModel | null> {
    const theatre = await db.getTheatreById(id);
    if (!theatre) return null;
    const model = new TheatreModel(id);
    model.data = theatre;
    return model;
  }

  static async update(id: number, input: UpdateTheatreInput): Promise<TheatreModel> {
    const updated = await db.updateTheatreById(id, input);
    const model = new TheatreModel(id);
    model.data = updated;
    return model;
  }

  static async delete(id: number): Promise<void> {
    await db.deleteTheatreById(id);
  }
}
