export type Migration = {
  id: number;
  name: string;
  up: string;
  down: string;
  checksum: string;
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface Dbms {
  listMigrations(tableName: string): Promise<Migration[]>;
  applyMigration(
    tableName: string,
    migration: Migration,
    opts: { checkEffects?: boolean }
  ): Promise<void>;
  revertMigration(tableName: string, migration: Migration): Promise<void>;
  computeChecksum(migration: Omit<Migration, 'checksum'>): Promise<string>;
}
