import { Kysely } from 'kysely';
import { DB } from '../types/db';

export async function up(database: Kysely<DB>): Promise<void> {
  await database.schema
    .createTable('app')
    .addColumn('id', 'serial', (column) => column.primaryKey())
    .addColumn('name', 'text', (column) => column.notNull())
    .addColumn('created_at', 'timestamptz', (column) => column.notNull())
    .execute();
}

// we probably don't want to drop any tables for production db, but so be it
export async function down(database: Kysely<unknown>): Promise<void> {
  await database.schema.dropTable('app').execute();
}