import * as performanceDomainFunctions from '@/library/db/performance';
import type {
  PerformanceWithRelations,
  CreatePerformanceInput,
  UpdatePerformanceInput,
} from '@/types/performance';
import db from '@/library/dbClient';

export class PerformanceModel {
  data: PerformanceWithRelations;

  private constructor(data: PerformanceWithRelations) {
    this.data = data;
  }

  /**
 * Fetch all performances plus their theatre & show.
 */
  static async findAll(
    isRaw: boolean = false
  ): Promise<PerformanceModel[] | PerformanceWithRelations[]> {
    const rows = await db('performance as p')
      .leftJoin('theatre_has_show as ths', 'p.theatre_has_show_id', 'ths.id')
      .leftJoin('theatre as t', 'ths.theatre_id', 't.id')
      .leftJoin('show as s', 'ths.show_id', 's.id')
      .select([
        'p.id',
        'p.theatre_has_show_id',
        'p.start_time',
        'p.type',
        'p.status',
        'p.created_at',
        'p.updated_at',
        't.id as theatre_id',
        't.name as theatre_name',
        't.address as theatre_address',
        't.status as theatre_status',
        't.created_at as theatre_created_at',
        't.updated_at as theatre_updated_at',
        's.id as show_id',
        's.name as show_name',
        's.status as show_status',
        's.created_at as show_created_at',
        's.updated_at as show_updated_at',
      ]);

    // If raw data requested, return plain relations
    if (isRaw) {
      return rows.map(row => ({
        id: row.id,
        theatre_has_show_id: row.theatre_has_show_id,
        start_time: row.start_time,
        type: row.type,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        theatre: row.theatre_id
          ? {
            id: row.theatre_id,
            name: row.theatre_name,
            address: row.theatre_address,
            status: row.theatre_status,
            created_at: row.theatre_created_at,
            updated_at: row.theatre_updated_at,
          }
          : null,
        show: row.show_id
          ? {
            id: row.show_id,
            name: row.show_name,
            status: row.show_status,
            created_at: row.show_created_at,
            updated_at: row.show_updated_at,
          }
          : null,
      }));
    }

    // Otherwise, wrap each in PerformanceModel
    return rows.map(row => {
      const perf: PerformanceWithRelations = {
        id: row.id,
        theatre_has_show_id: row.theatre_has_show_id,
        start_time: row.start_time,
        type: row.type,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        theatre: row.theatre_id
          ? {
            id: row.theatre_id,
            name: row.theatre_name,
            address: row.theatre_address,
            status: row.theatre_status,
            created_at: row.theatre_created_at,
            updated_at: row.theatre_updated_at,
          }
          : null,
        show: row.show_id
          ? {
            id: row.show_id,
            name: row.show_name,
            status: row.show_status,
            created_at: row.show_created_at,
            updated_at: row.show_updated_at,
          }
          : null,
      };
      return new PerformanceModel(perf);
    });
  }

  /**
   * Fetch one performance (with relations) by ID.
   */
  static async load(
    id: number,
    isRaw: boolean = false
  ): Promise<PerformanceModel | PerformanceWithRelations | null> {
    const row = await db('performance as p')
      .leftJoin('theatre_has_show as ths', 'p.theatre_has_show_id', 'ths.id')
      .leftJoin('theatre as t', 'ths.theatre_id', 't.id')
      .leftJoin('show as s', 'ths.show_id', 's.id')
      .select([
        'p.id',
        'p.theatre_has_show_id',
        'p.start_time',
        'p.type',
        'p.status',
        'p.created_at',
        'p.updated_at',
        't.id as theatre_id',
        't.name as theatre_name',
        't.address as theatre_address',
        't.status as theatre_status',
        't.created_at as theatre_created_at',
        't.updated_at as theatre_updated_at',
        's.id as show_id',
        's.name as show_name',
        's.status as show_status',
        's.created_at as show_created_at',
        's.updated_at as show_updated_at',
      ])
      .where('p.id', id)
      .first();

    if (!row) return null;

    const perf: PerformanceWithRelations = {
      id: row.id,
      theatre_has_show_id: row.theatre_has_show_id,
      start_time: row.start_time,
      type: row.type,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      theatre: row.theatre_id
        ? {
          id: row.theatre_id,
          name: row.theatre_name,
          address: row.theatre_address,
          status: row.theatre_status,
          created_at: row.theatre_created_at,
          updated_at: row.theatre_updated_at,
        }
        : null,
      show: row.show_id
        ? {
          id: row.show_id,
          name: row.show_name,
          status: row.show_status,
          created_at: row.show_created_at,
          updated_at: row.show_updated_at,
        }
        : null,
    };

    return isRaw ? perf : new PerformanceModel(perf);
  }

  static async loadTheatreHasShowOptions() {
    const theatreHasShowOptions = await db('theatre_has_show as ths')
      .leftJoin('theatre as t', 'ths.theatre_id', 't.id')
      .leftJoin('show as s', 'ths.show_id', 's.id')
      .select([
        'ths.id as id',
        't.id as theatre_id',
        't.name as theatre_name',
        's.id as show_id',
        's.name as show_name',
      ]);

    return theatreHasShowOptions;
  }

  /**
   * Create a new performance, then reload with relations.
   */
  static async create(input: CreatePerformanceInput): Promise<PerformanceModel> {
    const raw = await performanceDomainFunctions.createPerformance(input);
    return this.load(raw.id, false) as Promise<PerformanceModel>;
  }

  /**
   * Update an existing performance, then reload with relations.
   */
  static async update(
    id: number,
    input: UpdatePerformanceInput
  ): Promise<PerformanceModel> {
    await performanceDomainFunctions.updatePerformanceById(id, input);
    return this.load(id, false) as Promise<PerformanceModel>;
  }

  /**
   * Delete a performance by ID.
   */
  static async delete(id: number): Promise<void> {
    await performanceDomainFunctions.deletePerformanceById(id);
  }
}
