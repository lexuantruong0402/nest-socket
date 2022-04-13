import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Room } from 'src/entities/room.entity';
import { RoomRepository } from 'src/repositories/room.repository';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomRepo: RoomRepository) {}

  @Get()
  find() {
    return this.roomRepo.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.roomRepo.findOne({ id });
  }

  @Post()
  save(@Body() item: Room) {
    this.roomRepo.save(item);
  }
}
