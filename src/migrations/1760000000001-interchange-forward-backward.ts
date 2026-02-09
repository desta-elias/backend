import { MigrationInterface, QueryRunner } from 'typeorm';

export class InterchangeForwardBackward1760000000001
  implements MigrationInterface
{
  name = 'InterchangeForwardBackward1760000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration skipped: Direction columns no longer exist in the Bed entity.
    // The entity now uses position-based fields instead of direction fields.
    console.log('Migration InterchangeForwardBackward1760000000001 skipped - direction columns not present.');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Migration skipped: Direction columns no longer exist in the Bed entity.
    // The entity now uses position-based fields instead of direction fields.
    console.log('Migration InterchangeForwardBackward1760000000001 down skipped - direction columns not present.');
  }
}
