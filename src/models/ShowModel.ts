// src/models/ShowModel.ts
import * as showDomainFunctions from '@/library/db/show';
import type { Show, CreateShowInput, UpdateShowInput } from '@/types/show';

export class ShowModel {
  public data: Show;

  constructor(data: Show) {
    this.data = data;
  }

  /** Fetch all shows */
  static async findAll(): Promise<ShowModel[]> {
    const shows = await showDomainFunctions.getAllShows();
    return shows.map((s) => new ShowModel(s));
  }

  /** Fetch one show by ID */
  static async load(id: number): Promise<ShowModel> {
    const show = await showDomainFunctions.getShowById(id);
    if (!show) {
      throw new Error(`Show with id ${id} not found`);
    }
    return new ShowModel(show);
  }

  /** Create a new show */
  static async create(input: CreateShowInput): Promise<ShowModel> {
    const newShow = await showDomainFunctions.createShow(input);
    return new ShowModel(newShow);
  }

  /** Update an existing show */
  static async update(id: number, input: UpdateShowInput): Promise<ShowModel> {
    const updated = await showDomainFunctions.updateShowById(id, input);
    return new ShowModel(updated);
  }

  /** Delete a show */
  static async delete(id: number): Promise<void> {
    await showDomainFunctions.deleteShowById(id);
  }
}
