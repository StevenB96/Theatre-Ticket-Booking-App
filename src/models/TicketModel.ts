import * as ticketDomainFunctions from '@/library/db/ticket';
import type {
  TicketWithRelations,
  CreateTicketInput,
  UpdateTicketInput,
} from '@/types/ticket';
import db from '@/library/dbClient';
import { PerformanceModel } from '@/models/PerformanceModel';

export class TicketModel {
  data: TicketWithRelations;

  private constructor(data: TicketWithRelations) {
    this.data = data;
  }

  /**
   * Fetch all tickets plus related user, seat, performance, show, and theatre.
   */
  static async findAll(): Promise<TicketModel[]> {
    const rows = await db('ticket as tk')
      .leftJoin('user as u', 'tk.user_id', 'u.id')
      .leftJoin('seat as st', 'tk.seat_id', 'st.id')
      .leftJoin('performance as p', 'tk.performance_id', 'p.id')
      .select([
        'tk.id',
        'tk.user_id',
        'tk.seat_id',
        'tk.performance_id',
        'tk.price',
        'tk.status',
        'tk.created_at',
        'tk.updated_at',

        'u.id as user_id',
        'u.username as user_name',
        'u.email as user_email',
        'u.role as user_role',
        'u.status as user_status',
        'u.created_at as user_created_at',
        'u.updated_at as user_updated_at',

        'st.id as seat_id',
        'st.theatre_id as seat_theatre_id',
        'st.code as seat_code',
        'st.zone as seat_zone',
        'st.status as seat_status',
        'st.created_at as seat_created_at',
        'st.updated_at as seat_updated_at',

        'p.id as performance_id',
        'p.theatre_has_show_id as performance_theatre_has_show_id',
        'p.start_time as performance_start_time',
        'p.type as performance_type',
        'p.status as performance_status',
        'p.created_at as performance_created_at',
        'p.updated_at as performance_updated_at',
      ]);

    const ticketPromises = rows.map(async row => {
      // Load the full performance (with show & theatre)
      const perfModel = await PerformanceModel.load(row.performance_id);
      const perfData = perfModel?.data ?? null;

      const ticket: TicketWithRelations = {
        id: row.id,
        user_id: row.user_id,
        seat_id: row.seat_id,
        performance_id: row.performance_id,
        price: row.price,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,

        user: row.user_id ? {
          id: row.user_id,
          username: row.user_name,
          email: row.user_email,
          role: row.user_role,
          status: row.user_status,
          created_at: row.user_created_at,
          updated_at: row.user_updated_at,
        } : null,

        seat: row.seat_id ? {
          id: row.seat_id,
          theatre_id: row.seat_theatre_id,
          code: row.seat_code,
          zone: row.seat_zone,
          status: row.seat_status,
          created_at: row.seat_created_at,
          updated_at: row.seat_updated_at,
        } : null,

        performance: perfData
          ? {
            ...perfData,
          }
          : null,
      };

      return new TicketModel(ticket);
    });

    return await Promise.all(ticketPromises);
  }

  /**
   * Fetch one ticket (with relations) by ID.
   */
  static async load(
    id: number,
  ): Promise<TicketModel> {
    const row = await db('ticket as tk')
      .leftJoin('user as u', 'tk.user_id', 'u.id')
      .leftJoin('seat as st', 'tk.seat_id', 'st.id')
      .leftJoin('performance as p', 'tk.performance_id', 'p.id')
      .select([
        'tk.id',
        'tk.user_id',
        'tk.seat_id',
        'tk.performance_id',
        'tk.price',
        'tk.status',
        'tk.created_at',
        'tk.updated_at',

        'u.id as user_id',
        'u.username as user_name',
        'u.email as user_email',
        'u.role as user_role',
        'u.status as user_status',
        'u.created_at as user_created_at',
        'u.updated_at as user_updated_at',

        'st.id as seat_id',
        'st.theatre_id as seat_theatre_id',
        'st.code as seat_code',
        'st.zone as seat_zone',
        'st.status as seat_status',
        'st.created_at as seat_created_at',
        'st.updated_at as seat_updated_at',

        'p.id as performance_id',
        'p.theatre_has_show_id as performance_theatre_has_show_id',
        'p.start_time as performance_start_time',
        'p.type as performance_type',
        'p.status as performance_status',
        'p.created_at as performance_created_at',
        'p.updated_at as performance_updated_at',
      ])
      .where('tk.id', id)
      .first();

    // Load the full performance (with show & theatre)
    const perfModel = await PerformanceModel.load(row.performance_id);
    const perfData = perfModel?.data ?? null;

    const ticket: TicketWithRelations = {
      id: row.id,
      user_id: row.user_id,
      seat_id: row.seat_id,
      performance_id: row.performance_id,
      price: row.price,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,

      user: row.user_id ? {
        id: row.user_id,
        username: row.user_name,
        email: row.user_email,
        role: row.user_role,
        status: row.user_status,
        created_at: row.user_created_at,
        updated_at: row.user_updated_at,
      } : null,

      seat: row.seat_id ? {
        id: row.seat_id,
        theatre_id: row.seat_theatre_id,
        code: row.seat_code,
        zone: row.seat_zone,
        status: row.seat_status,
        created_at: row.seat_created_at,
        updated_at: row.seat_updated_at,
      } : null,

      performance: perfData
        ? {
          ...perfData,
        }
        : null,
    };

    return new TicketModel(ticket);
  }

  static serialise(performances: TicketModel[]): TicketWithRelations[] {
    return performances.map(p => p.data);
  }

  /**
   * Create a new ticket, then reload with relations.
   */
  static async create(input: CreateTicketInput): Promise<TicketModel> {
    const raw = await ticketDomainFunctions.createTicket(input);
    return this.load(raw.id) as Promise<TicketModel>;
  }

  /**
   * Update an existing ticket, then reload with relations.
   */
  static async update(
    id: number,
    input: UpdateTicketInput
  ): Promise<TicketModel> {
    await ticketDomainFunctions.updateTicketById(id, input);
    return this.load(id) as Promise<TicketModel>;
  }

  /**
   * Delete a ticket by ID.
   */
  static async delete(id: number): Promise<void> {
    await ticketDomainFunctions.deleteTicketById(id);
  }
}
