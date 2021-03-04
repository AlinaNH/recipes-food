import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly port: number;

  constructor() {
    this.port = 2121;
  }
}
