import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBedDirectionColumns1760000000000 implements MigrationInterface {
  name = 'AddBedDirectionColumns1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = \'beds_headDirection_enum\') THEN CREATE TYPE "beds_headDirection_enum" AS ENUM (\'forward\', \'backward\', \'stop\'); END IF; END $$;',
    );
    await queryRunner.query(
      'DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = \'beds_rightTiltDirection_enum\') THEN CREATE TYPE "beds_rightTiltDirection_enum" AS ENUM (\'forward\', \'backward\', \'stop\'); END IF; END $$;',
    );
    await queryRunner.query(
      'DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = \'beds_leftTiltDirection_enum\') THEN CREATE TYPE "beds_leftTiltDirection_enum" AS ENUM (\'forward\', \'backward\', \'stop\'); END IF; END $$;',
    );
    await queryRunner.query(
      'DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = \'beds_legDirection_enum\') THEN CREATE TYPE "beds_legDirection_enum" AS ENUM (\'forward\', \'backward\', \'stop\'); END IF; END $$;',
    );

    await queryRunner.query(
      'ALTER TABLE "beds" ADD COLUMN IF NOT EXISTS "headDirection" "beds_headDirection_enum" NOT NULL DEFAULT \'stop\'',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" ADD COLUMN IF NOT EXISTS "rightTiltDirection" "beds_rightTiltDirection_enum" NOT NULL DEFAULT \'stop\'',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" ADD COLUMN IF NOT EXISTS "leftTiltDirection" "beds_leftTiltDirection_enum" NOT NULL DEFAULT \'stop\'',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" ADD COLUMN IF NOT EXISTS "legDirection" "beds_legDirection_enum" NOT NULL DEFAULT \'stop\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "beds" DROP COLUMN IF EXISTS "legDirection"',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" DROP COLUMN IF EXISTS "leftTiltDirection"',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" DROP COLUMN IF EXISTS "rightTiltDirection"',
    );
    await queryRunner.query(
      'ALTER TABLE "beds" DROP COLUMN IF EXISTS "headDirection"',
    );

    await queryRunner.query(
      'DROP TYPE IF EXISTS "beds_legDirection_enum"',
    );
    await queryRunner.query(
      'DROP TYPE IF EXISTS "beds_leftTiltDirection_enum"',
    );
    await queryRunner.query(
      'DROP TYPE IF EXISTS "beds_rightTiltDirection_enum"',
    );
    await queryRunner.query(
      'DROP TYPE IF EXISTS "beds_headDirection_enum"',
    );
  }
}
