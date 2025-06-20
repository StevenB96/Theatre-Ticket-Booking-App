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

  async update(input: UpdateTheatreInput): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No theatre loaded');
    const updated = await db.updateTheatreById(this.id, input);
    this.data = updated;
  }

  async delete(): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No theatre loaded');
    await db.deleteTheatreById(this.id);
    this.data = null;
    this.id = null;
  }
}
