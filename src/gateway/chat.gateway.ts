import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { RoomRepository } from 'src/repositories/room.repository';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly roomRepo: RoomRepository) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(
    client: Socket,
    payload: { room: string; userName: string; message: string },
  ): Promise<void> {
    this.server
      .to(payload.room)
      .emit('msgToClient', `${payload.userName}: ${payload.message}`);

    // add mess to room and save to database
    const dbRoom = await this.roomRepo.findOne({ name: payload.room });

    dbRoom.message.push({
      userName: payload.userName,
      message: payload.message,
    });
    await this.roomRepo.save(dbRoom);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    client: Socket,
    payload: { room: string; username: string },
  ): Promise<void> {
    client.join(payload.room);
    const wc = `welcome to ${payload.room}`;
    this.server.to(payload.room).emit('msgToClient', wc);

    // create room database
    const dbRoom = await this.roomRepo.findOne({ name: payload.room });
    if (!dbRoom) {
      await this.roomRepo.save({
        name: payload.room,
        message: [],
        joinRoom: [payload.username],
      });
    } else {
      const checkUser = dbRoom.joinRoom.find((e) => e === payload.username);
      if (!checkUser) dbRoom.joinRoom.push(payload.username);
      await this.roomRepo.save(dbRoom);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
