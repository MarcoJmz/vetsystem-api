import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  // Column for unique email addresses
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  // Column for user roles (e.g., admin, user)
  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string;

  // Column to track if the user is active
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Timestamps for record creation and updates
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
