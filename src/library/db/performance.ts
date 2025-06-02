const db = require('../dbClient');

// Get all performances
export async function getAllPerformances(): Promise<
  {
    id: number;
    theatre_has_show_id: number;
    start_time: string;
    type: number;
    status: number;
    created_at: string;
    updated_at: string;
  }[]
> {
  return db('performance')
    .select(
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
};

// Get one performance by ID
export async function getPerformanceById(
  id: number
): Promise<
  | {
    id: number;
    theatre_has_show_id: number;
    start_time: string;
    type: number;
    status: number;
    created_at: string;
    updated_at: string;
  }
  | undefined
> {
  return db('performance')
    .where({ id })
    .first();
};

// Create a new performance
export async function createPerformance(input: {
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
}): Promise<{
  id: number;
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
}> {
  const [newPerformance] = await db('performance')
    .insert(input)
    .returning([
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);
  return newPerformance;
};

// Update an existing performance
export async function updatePerformance(
  id: number,
  data: Partial<{
    theatre_has_show_id: number;
    start_time: string;
    type: number;
    status: number;
  }>
): Promise<{
  id: number;
  theatre_has_show_id: number;
  start_time: string;
  type: number;
  status: number;
  created_at: string;
  updated_at: string;
}> {
  const [updatedPerformance] = await db('performance')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);
  return updatedPerformance;
};

// Delete an existing performance
export async function deletePerformance(id: number) {
  await db('performance')
    .where({ id })
    .del();
};
