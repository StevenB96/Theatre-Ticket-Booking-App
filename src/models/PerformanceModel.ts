import * as db from '@/library/db/performance';
import type { Performance, CreatePerformanceInput, UpdatePerformanceInput } from '@/types/performance';

export class PerformanceModel {
  data: Performance | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const performance = await db.getPerformanceById(this.id);
    this.data = performance ?? null;
  }

  static async list(): Promise<Performance[]> {
    return db.getAllPerformances();
  }

  static async create(input: CreatePerformanceInput): Promise<PerformanceModel> {
    const newPerformance = await db.createPerformance(input);
    const model = new PerformanceModel(newPerformance.id);
    model.data = newPerformance;
    return model;
  }

  static async find(id: number): Promise<PerformanceModel | null> {
    const performance = await db.getPerformanceById(id);
    if (!performance) return null;
    const model = new PerformanceModel(id);
    model.data = performance;
    return model;
  }

  static async update(id: number, input: UpdatePerformanceInput): Promise<PerformanceModel> {
    const updated = await db.updatePerformanceById(id, input);
    const model = new PerformanceModel(id);
    model.data = updated;
    return model;
  }

  static async delete(id: number): Promise<void> {
    await db.deletePerformanceById(id);
  }
}
