// src/entity/Session.ts
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsNotEmpty, IsObject } from 'class-validator';

const isSQLite = 'sqlite';
@Entity()
@Index(['userId'], { unique: true })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false })
  @IsNotEmpty()
  userId!: string;

  @Column({ type: isSQLite ? 'simple-json' : 'jsonb', nullable: false })
  @IsObject()
  sessionInfo!: Record<string, any>;

  @Column({ type: isSQLite ? 'datetime' : 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: isSQLite ? 'datetime' : 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
