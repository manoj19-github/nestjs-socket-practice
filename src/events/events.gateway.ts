/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);
  @WebSocketServer() io: Server;
  afterInit(server: any) {
    this.logger.log('socket initialized');
  }
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.sentEvent(client, 'hello');
    this.logger.log(` client id  : ${client.id} conntected`);
    this.logger.debug(`Number of connected clients : ${sockets.size}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(` client id  : ${client.id} disconntected`);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log(` Message received from  client id  : ${client.id} `);
    return 'Hello world!';
  }
  sentEvent(client: any, payload: any) {
    setInterval(() => {
      this.io.emit('hi', 'manoj santra');
    }, 2000);
  }
}
