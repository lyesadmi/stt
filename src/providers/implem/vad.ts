import type { ReadStream } from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VAD from 'node-vad';
import Provider from '../domain/Provider';

console.log(VAD.Mode);

class VADProvider extends Provider {
  private _vad: any = VAD.createStream({
    mode: VAD.Mode.NORMAL,
    audioFrequency: 16000,
    debounceTime: 1000,
  });

  override process(stream: ReadStream): Provider {
    stream.pipe(this._vad).on('data', (data: any) => {
      console.log(data.speech);
    });
    return this;
  }

  override async stop() {
    console.log(this.name + ':STOPPED!');
  }
}

export default VADProvider;
