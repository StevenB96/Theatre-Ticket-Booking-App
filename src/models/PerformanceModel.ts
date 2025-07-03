import * as performanceDomainFunctions from '@/library/db/performance';
import type {
  PerformanceWithRelations,
  CreatePerformanceInput,
  UpdatePerformanceInput,
} from '@/types/performance';
import db from '@/library/dbClient';

export class PerformanceModel {
  public data: PerformanceWithRelations;

  constructor(data: PerformanceWithRelations) {
    this.data = data;
  }

  /**
 * Fetch all performances plus their theatre & show.
 */
  static async findAll(): Promise<PerformanceModel[]> {
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

    return rows.map(row => {
      const {
        id,
        theatre_has_show_id,
        start_time,
        type,
        status,
        created_at,
        updated_at,

        theatre_id,
        theatre_name,
        theatre_address,
        theatre_status,
        theatre_created_at,
        theatre_updated_at,

        show_id,
        show_name,
        show_status,
        show_created_at,
        show_updated_at,
      } = row;

      const perfData: PerformanceWithRelations = {
        id,
        theatre_has_show_id,
        start_time,
        type,
        status,
        created_at,
        updated_at,
        theatre: theatre_id
          ? {
            id: theatre_id,
            name: theatre_name,
            address: theatre_address,
            status: theatre_status,
            created_at: theatre_created_at,
            updated_at: theatre_updated_at,
          }
          : null,
        show: show_id
          ? {
            id: show_id,
            name: show_name,
            status: show_status,
            created_at: show_created_at,
            updated_at: show_updated_at,
          }
          : null,
      };

      return new PerformanceModel(perfData);
    });
  }

  /**
   * Fetch one performance (with relations) by ID.
   */
  static async load(id: number): Promise<PerformanceModel> {
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

    if (!row) {
      throw new Error(`Performance with id ${id} not found`);
    }

    const {
      id: perfId,
      theatre_has_show_id,
      start_time,
      type,
      status,
      created_at,
      updated_at,

      theatre_id,
      theatre_name,
      theatre_address,
      theatre_status,
      theatre_created_at,
      theatre_updated_at,

      show_id,
      show_name,
      show_status,
      show_created_at,
      show_updated_at,
    } = row;

    const perfData: PerformanceWithRelations = {
      id: perfId,
      theatre_has_show_id,
      start_time,
      type,
      status,
      created_at,
      updated_at,
      theatre: theatre_id
        ? {
          id: theatre_id,
          name: theatre_name,
          address: theatre_address,
          status: theatre_status,
          created_at: theatre_created_at,
          updated_at: theatre_updated_at,
        }
        : null,
      show: show_id
        ? {
          id: show_id,
          name: show_name,
          status: show_status,
          created_at: show_created_at,
          updated_at: show_updated_at,
        }
        : null,
    };

    return new PerformanceModel(perfData);
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
    return this.load(raw.id) as Promise<PerformanceModel>;
  }

  /**
   * Update an existing performance, then reload with relations.
   */
  static async update(
    id: number,
    input: UpdatePerformanceInput
  ): Promise<PerformanceModel> {
    await performanceDomainFunctions.updatePerformanceById(id, input);
    return this.load(id) as Promise<PerformanceModel>;
  }

  /**
   * Delete a performance by ID.
   */
  static async delete(id: number): Promise<void> {
    await performanceDomainFunctions.deletePerformanceById(id);
  }
}
