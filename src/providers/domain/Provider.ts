import { EventEmitter } from 'events';
import type { ReadStream } from 'fs';

abstract class Provider extends EventEmitter {
  name: string;

  constructor() {
    super();
    this.name = this.constructor.name;
  }

  process(_stream: ReadStream): Provider {
    throw new Error('NotImplementedError: please implement process(stream)');
  }

  async stop() {
    throw new Error('NotImplementedError: please implement stop()');
  }
}

export default Provider;
