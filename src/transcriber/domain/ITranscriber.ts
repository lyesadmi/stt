import type { ReadStream } from 'fs';
import type { EventEmitter } from 'events';
import type Provider from '../../providers/domain/Provider';

interface ITranscriber extends EventEmitter {
  add(provider: Provider): ITranscriber;
  stop(): void;
  transcribe(stream: ReadStream): ITranscriber;
}

export default ITranscriber;
