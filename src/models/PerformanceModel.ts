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
      // join theatre directly off p.theatre_id
      .leftJoin('theatre as t', 't.id', 'p.theatre_id')
      // join show directly off p.show_id
      .leftJoin('show as s', 's.id', 'p.show_id')
      .select([
        // performance fields
        'p.id',
        'p.theatre_id',
        'p.show_id',
        'p.start_time',
        'p.type',
        'p.status',
        'p.created_at',
        'p.updated_at',

        // theatre fields
        't.id as theatre_id',
        't.name as theatre_name',
        't.address as theatre_address',
        't.status as theatre_status',
        't.created_at as theatre_created_at',
        't.updated_at as theatre_updated_at',

        // show fields
        's.id as show_id',
        's.name as show_name',
        's.status as show_status',
        's.created_at as show_created_at',
        's.updated_at as show_updated_at',
      ]);

    return rows.map(row => {
      const {
        id,
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
        theatre_id,
        show_id,
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
      // Join the theatre directly
      .leftJoin('theatre as t', 't.id', 'p.theatre_id')
      // Join the show directly
      .leftJoin('show as s', 's.id', 'p.show_id')
      .select([
        // performance fields
        'p.id',
        'p.theatre_id',
        'p.show_id',
        'p.start_time',
        'p.type',
        'p.status',
        'p.created_at',
        'p.updated_at',

        // theatre fields
        't.id as theatre_id',
        't.name as theatre_name',
        't.address as theatre_address',
        't.status as theatre_status',
        't.created_at as theatre_created_at',
        't.updated_at as theatre_updated_at',

        // show fields
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
      theatre_id,
      show_id,
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

  async getSeatSalesByPricePercentage(): Promise<{
    percentage: number;
    group: string;
  }[]> {
    const totalRow = await db('ticket')
      .where('performance_id', this.data.id)
      .where('status', 1)
      .count('* as total')
      .first();

    const total = Number(totalRow?.total ?? 1); // prevent divide-by-zero

    const result = await db('ticket')
      .where('performance_id', this.data.id)
      .where('status', 1)
      .andWhere('user_id', '!=', 0)
      .groupBy('price')
      .select(
        'price as group',
        db.raw('ROUND(COUNT(*) * 100.0 / ?, 2) as percentage', [total])
      );

    // Calculate total percentage, safely ignoring non-numeric values
    const totalSoldPercentage = result.reduce((total, r) => {
      const perc = parseFloat(r.percentage);
      return total + (isNaN(perc) ? 0 : perc);
    }, 0);

    // Calculate 'Unsold' percentage
    const unsoldPercentage = Math.max(0, 100 - totalSoldPercentage);

    // Append 'Unsold' group if there's remaining percentage
    if (unsoldPercentage > 0) {
      result.push({
        group: 'Unsold',
        percentage: unsoldPercentage,
      });
    }

    // Convert all 'percentage' fields to float, handling potential invalid values
    const resultWithFloats = result.map(item => ({
      ...item,
      percentage: isNaN(item.percentage) ? 0 : parseFloat(item.percentage),
    }));

    console.log({resultWithFloats});

    // Return the original result array (if needed), or the processed array
    return resultWithFloats;
  }
}
