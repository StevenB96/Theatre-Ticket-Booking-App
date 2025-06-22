// --- src/types/performance.ts ---

import type { Theatre } from '@/types/theatre';
import type { Show } from '@/types/show';

export interface Performance {
  id: number;
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePerformanceInput {
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
}

export interface UpdatePerformanceInput extends CreatePerformanceInput {
  id: number;
}

export interface PerformanceWithRelations extends Performance {
  theatre: Theatre | null;
  show: Show | null;
}

export interface TheatreHasShowOption {
  id: number;
  theatre_id: number;
  theatre_name: string;
  show_id: number;
  show_name: string;
}
