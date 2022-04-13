import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('room')
export class Room {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  name?: string;

  @Column()
  message?: [{ userName: string; message: string }];

  @Column()
  joinRoom?: string[];
}
