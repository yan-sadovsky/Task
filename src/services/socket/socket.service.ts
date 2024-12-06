import { step } from '../reporter/step.decorator';
import { report } from '../reporter/report';
import { io, Socket, SocketOptions } from 'socket.io-client';

type storedMessage = {
  type: string;
  data: string;
};

type pushMessage = storedMessage | { secret_key: string };

type responseMesage = { success: boolean; error?: string; message?: string };

export class SocketService {
  private readonly socket: Socket;
  private readonly messages: storedMessage[] = [];
  private lastResponse: responseMesage | null = null;

  public constructor(
    private readonly url: string,
    private readonly options: SocketOptions,
  ) {
    this.socket = io(this.url, {
      ...this.options,
      autoConnect: false,
      path: '/v4/socket.io',
      transports: ['websocket'],
      rejectUnauthorized: false,
    });
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }

  @step('Connect to socket')
  public async connect(): Promise<void> {
    await report.attach(this.options, 'Socket options');

    this.socket.on('m', (m) => {
      console.log('Message (m):', m);
      this.lastResponse = JSON.parse(m) as responseMesage;
    });

    this.socket.on('p', (p) => {
      console.log('Push (p):', p);
      let msg = JSON.parse(p) as pushMessage;
      if ('secret_key' in msg) msg = { type: 'secret_key', data: msg.secret_key };
      this.messages.push(msg);
    });

    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log(`Connected to ${this.url}`);
        resolve();
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        reject(err);
      });

      this.socket.connect();
    });
  }

  @step('Disconnect from socket')
  public async disconnect(): Promise<void> {
    if (this.isConnected()) {
      this.socket.disconnect();
    }
    console.log('Disconnected from socket');
  }

  @step('Send m message from client')
  public async sendMessage(data: unknown): Promise<void> {
    this.socket.emit('m', data, (ack: unknown) => {
      console.log('Acknowledgment from server:', ack);
    });
  }

  async sleep(msec: number) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }

  @step('Get push message from server')
  public async getMessage(type: string, timeout = 5000): Promise<string> {
    while ((timeout -= 500)) {
      // console.log('Stored messages:   ', this.messages);
      const message = this.messages.find((m) => m.type == type);
      if (message) return message.data;
      await this.sleep(500);
    }
    throw new Error(`Message with type: '${type}' not found!`);
  }

  @step('Get response from server')
  public async getResponse(timeout = 5000): Promise<responseMesage> {
    while ((timeout -= 500)) {
      // console.log('last response:   ', this.lastResponse);
      if (this.lastResponse) {
        const result = this.lastResponse;
        this.lastResponse = null;
        return result;
      }
      await this.sleep(500);
    }
    throw new Error(`Last response is null!`);
  }
}
