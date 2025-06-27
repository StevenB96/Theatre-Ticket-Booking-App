// src/db/knex-logger.ts
import type { Knex } from 'knex';

export interface LoggerOptions {
  /** Exit the process on query errors (default: true) */
  exitOnError?: boolean;
}

/**
 * Attach detailed SQL, response, and error logging to a Knex instance.
 * @param db Knex instance to attach logging to
 * @param opts Configuration options for logger behavior
 */
export function attachKnexLogging(
  db: Knex,
  opts: LoggerOptions = { exitOnError: true }
): void {
  const { exitOnError = true } = opts;

  // Log each SQL query and its bindings
  db.on('query', (query) => {
    const bindings = query.bindings ?? [];
    const bindingInfo = bindings.length
      ? ` [bindings: ${JSON.stringify(bindings)}]`
      : '';
    console.log(`🧩 [KNEX QUERY] ${query.sql}${bindingInfo}`);
  });

  // Log the query response and row count
  db.on('query-response', (response, query) => {
    const rowsInfo = Array.isArray(response)
      ? `${response.length} row(s)`
      : JSON.stringify(response);
    console.log(`✅ [KNEX RESPONSE] ${query.sql} → ${rowsInfo}`);
  });

  // Log query errors and exit if configured
  db.on('query-error', (err, query) => {
    console.error(`❌ [KNEX QUERY ERROR] ${err.message}`);
    console.error(`    SQL: ${query.sql}`);
    console.error(`    Bindings: ${JSON.stringify(query.bindings ?? [])}`);

    if (exitOnError) {
      console.error('🛑 Exiting process due to query error.');
      process.exit(1);
    }
  });

  // Attach pool-level error handler
  db.client.pool.on('error', (err: Error) => {
    console.error('🛑 [KNEX POOL ERROR]', err);
    if (exitOnError) {
      console.error('🛑 Exiting process due to pool error.');
      process.exit(1);
    }
  });
}
