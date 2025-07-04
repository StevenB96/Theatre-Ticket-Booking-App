// src/models/ShowModel.ts
import * as showDomainFunctions from '@/library/db/show';
import type { Show, CreateShowInput, UpdateShowInput } from '@/types/show';
import db from '@/library/dbClient';
import { count } from 'console';

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

  async ticketSales(): Promise<{
    show_id: number;
    show_name: string;
    theatre_name: string;
    ticket_count: number;
    total_revenue: number;
    avg_ticket_price: number;
  }[]> {
    const result = await db('show as s')
      // 1) Join performances directly by show_id
      .leftJoin('performance as p', 'p.show_id', 's.id')
      // 2) Join theatres directly by theatre_id on performance
      .leftJoin('theatre as th', 'th.id', 'p.theatre_id')
      // 3) Join tickets by performance_id
      .leftJoin('ticket as tk', 'tk.performance_id', 'p.id')
      // 4) Filter to this show & only active shows
      .where('s.id', this.data.id)
      .andWhere('s.status', 1)
      // 5) Group by show + theatre
      .groupBy('s.id', 's.name', 'th.id', 'th.name')
      // 6) Select the identifying fields
      .select(
        's.id as show_id',
        's.name as show_name',
        'th.name as theatre_name',
      )
      // 7) Aggregate metrics
      .avg('tk.price as avg_ticket_price')
      .count('tk.id as ticket_count')
      .sum('tk.price as total_revenue');

    return result.map(row => ({
      show_id: Number(row.show_id),
      show_name: row.show_name,
      theatre_name: row.theatre_name,
      ticket_count: Number(row.ticket_count),
      total_revenue: Number(row.total_revenue),
      avg_ticket_price: Number(row.avg_ticket_price),
    }));
  }
}
