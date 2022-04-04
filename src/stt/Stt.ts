import { EventEmitter } from 'events';
import type ITranscriber from '../transcriber/domain/ITranscriber';
import type IReader from '../reader/domain/IReader';

function makeSTT({
  reader,
  transcriber,
}: {
  reader: IReader;
  transcriber: ITranscriber;
}) {
  return class STT extends EventEmitter {
    private _transcriber: ITranscriber = transcriber;
    private readonly _reader: IReader = reader;

    constructor() {
      super();

      this._transcriber.on('TRANSCRIPT_RAW_EVENT', (transcript) => {
        this.emit('normalizedTranscript', transcript);
      });
    }

    public transcribe(filePath: string): STT {
      const stream = this._reader.read(filePath);
      this._transcriber.transcribe(stream);

      return this;
    }

    public stop() {
      this._transcriber.stop();
    }
  };
}

export default makeSTT;
