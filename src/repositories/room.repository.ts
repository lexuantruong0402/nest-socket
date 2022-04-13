import { Room } from 'src/entities/room.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
