import * as db from '@/library/db/ticket';
import type { Ticket, CreateTicketInput, UpdateTicketInput } from '@/types/ticket';

export class TicketModel {
  data: Ticket | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const ticket = await db.getTicketById(this.id);
    this.data = ticket ?? null;
  }

  static async list(): Promise<Ticket[]> {
    return db.getAllTickets();
  }

  static async create(input: CreateTicketInput): Promise<TicketModel> {
    const newTicket = await db.createTicket(input);
    const model = new TicketModel(newTicket.id);
    model.data = newTicket;
    return model;
  }

  static async find(id: number): Promise<TicketModel | null> {
    const ticket = await db.getTicketById(id);
    if (!ticket) return null;
    const model = new TicketModel(id);
    model.data = ticket;
    return model;
  }

  async update(input: UpdateTicketInput): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No ticket loaded');
    const updated = await db.updateTicketById(this.id, input);
    this.data = updated;
  }

  async delete(): Promise<void> {
    if (!this.data || this.id === null) throw new Error('No ticket loaded');
    await db.deleteTicketById(this.id);
    this.data = null;
    this.id = null;
  }
}
