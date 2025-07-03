import * as ticketDomainFunctions from '@/library/db/ticket';
import type {
  TicketWithRelations,
  CreateTicketInput,
  UpdateTicketInput,
} from '@/types/ticket';
import db from '@/library/dbClient';

export class TicketModel {
  public data: TicketWithRelations;

  constructor(data: TicketWithRelations) {
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
        'u.username as user_username',
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

    return rows.map(row => {
      const {
        id,
        user_id,
        seat_id,
        performance_id,
        price,
        status,
        created_at,
        updated_at,

        user_username,
        user_email,
        user_role,
        user_status,
        user_created_at,
        user_updated_at,

        seat_theatre_id,
        seat_code,
        seat_zone,
        seat_status,
        seat_created_at,
        seat_updated_at,

        performance_theatre_has_show_id,
        performance_start_time,
        performance_type,
        performance_status,
        performance_created_at,
        performance_updated_at,
      } = row;

      const ticketData: TicketWithRelations = {
        id,
        user_id,
        seat_id,
        performance_id,
        price,
        status,
        created_at,
        updated_at,
        user: user_id
          ? {
            id: user_id,
            username: user_username,
            email: user_email,
            role: user_role,
            status: user_status,
            created_at: user_created_at,
            updated_at: user_updated_at,
          }
          : null,
        seat: seat_id
          ? {
            id: seat_id,
            theatre_id: seat_theatre_id,
            code: seat_code,
            zone: seat_zone,
            status: seat_status,
            created_at: seat_created_at,
            updated_at: seat_updated_at,
          }
          : null,
        performance: performance_id
          ? {
            id: performance_id,
            theatre_has_show_id: performance_theatre_has_show_id,
            start_time: performance_start_time,
            type: performance_type,
            status: performance_status,
            created_at: performance_created_at,
            updated_at: performance_updated_at,
          }
          : null,
      };

      return new TicketModel(ticketData);
    });
  }


  /**
   * Fetch one ticket (with relations) by ID.
   */
  static async load(id: number): Promise<TicketModel> {
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
        'u.username as user_username',
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

    if (!row) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    const {
      id: ticketId,
      user_id,
      seat_id,
      performance_id,
      price,
      status,
      created_at,
      updated_at,

      user_username,
      user_email,
      user_role,
      user_status,
      user_created_at,
      user_updated_at,

      seat_theatre_id,
      seat_code,
      seat_zone,
      seat_status,
      seat_created_at,
      seat_updated_at,

      performance_theatre_has_show_id,
      performance_start_time,
      performance_type,
      performance_status,
      performance_created_at,
      performance_updated_at,
    } = row;

    const ticketData: TicketWithRelations = {
      id: ticketId,
      user_id,
      seat_id,
      performance_id,
      price,
      status,
      created_at,
      updated_at,
      user: user_id
        ? {
          id: user_id,
          username: user_username,
          email: user_email,
          role: user_role,
          status: user_status,
          created_at: user_created_at,
          updated_at: user_updated_at,
        }
        : null,
      seat: seat_id
        ? {
          id: seat_id,
          theatre_id: seat_theatre_id,
          code: seat_code,
          zone: seat_zone,
          status: seat_status,
          created_at: seat_created_at,
          updated_at: seat_updated_at,
        }
        : null,
      performance: performance_id
        ? {
          id: performance_id,
          theatre_has_show_id: performance_theatre_has_show_id,
          start_time: performance_start_time,
          type: performance_type,
          status: performance_status,
          created_at: performance_created_at,
          updated_at: performance_updated_at,
        }
        : null,
    };

    return new TicketModel(ticketData);
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
