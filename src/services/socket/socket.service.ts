import { step } from '../reporter/step.decorator';
import { report } from '../reporter/report';
import { io, Socket, SocketOptions } from 'socket.io-client';

export class SocketService {
  private readonly socket: Socket;

  public constructor(
    private readonly url: string,
    private readonly options: SocketOptions,
  ) {
    this.socket = io(this.url, this.options);
  }

  public async isConnected(): Promise<boolean> {
    return this.socket.connected;
  }

  @step('Connect to socket')
  public async connect(): Promise<void> {
    await report.attach(this.options, 'Socket options');
    // TODO: socket connection
  }

  @step('Disconnect from socket')
  public async disconnect(): Promise<void> {
    if (await this.isConnected()) {
      this.socket.disconnect();
    }
  }

  // TODO: message transmission logic
}
