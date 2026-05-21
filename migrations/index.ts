import * as migration_20260521_012520 from './20260521_012520';

export const migrations = [
  {
    up: migration_20260521_012520.up,
    down: migration_20260521_012520.down,
    name: '20260521_012520'
  },
];
