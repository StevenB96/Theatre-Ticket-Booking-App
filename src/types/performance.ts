// --- src/types/performance.ts ---
export interface Performance {
  id: number;
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePerformanceInput {
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface UpdatePerformanceInput extends CreatePerformanceInput {
  id: number;
}
