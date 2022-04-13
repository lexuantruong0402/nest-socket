import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RoomsController } from './controller/room.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { RoomRepository } from './repositories/room.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.ADMIN_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([RoomRepository]),
  ],
  controllers: [AppController, RoomsController],
  providers: [ChatGateway],
})
export class AppModule {}
