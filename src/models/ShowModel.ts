import * as showDomainFunctions from '@/library/db/show';
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
    const show = await showDomainFunctions.getShowById(this.id);
    this.data = show ?? null;
  }

  static async list(): Promise<Show[]> {
    return showDomainFunctions.getAllShows();
  }

  static async find(id: number): Promise<ShowModel | null> {
    const show = await showDomainFunctions.getShowById(id);
    if (!show) return null;
    const model = new ShowModel(id);
    model.data = show;
    return model;
  }

  static async create(input: CreateShowInput): Promise<ShowModel> {
    const newShow = await showDomainFunctions.createShow(input);
    const model = new ShowModel(newShow.id);
    model.data = newShow;
    return model;
  }

  static async update(id: number, input: UpdateShowInput): Promise<ShowModel> {
    const updated = await showDomainFunctions.updateShowById(id, input);
    const model = new ShowModel(id);
    model.data = updated;
    return model;
  }

  static async delete(id: number): Promise<void> {
    await showDomainFunctions.deleteShowById(id);
  }
}
