import * as db from '@/library/db/show';
import type { Show, CreateShowInput, UpdateShowInput } from '@/types/show';

export class ShowModel {
  data: Show | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const show = await db.getShowById(this.id);
    this.data = show ?? null;
  }

  static async list(): Promise<Show[]> {
    return db.getAllShows();
  }

  static async create(input: CreateShowInput): Promise<ShowModel> {
    const newShow = await db.createShow(input);
    const model = new ShowModel(newShow.id);
    model.data = newShow;
    return model;
  }

  static async find(id: number): Promise<ShowModel | null> {
    const show = await db.getShowById(id);
    if (!show) return null;
    const model = new ShowModel(id);
    model.data = show;
    return model;
  }

  async update(input: UpdateShowInput): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No show loaded');
    const updated = await db.updateShowById(this.id, input);
    this.data = updated;
  }

  async delete(): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No show loaded');
    await db.deleteShowById(this.id);
    this.data = null;
    this.id = null;
  }
}
