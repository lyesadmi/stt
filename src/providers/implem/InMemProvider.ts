import type { ReadStream } from 'fs';

import generateSentence from '../../shared/seeds/generate-sentence';
import Provider from '../domain/Provider';

class InMemProvider extends Provider {
  _id = 0;

  _getTranscript() {
    return generateSentence();
  }

  override process(stream: ReadStream): Provider {
    const transcriptInterval = setInterval(() => {
      if (this._id >= 20) {
        clearInterval(transcriptInterval);
      }
      this.emit('TRANSCRIPT_RAW_EVENT', {
        id: this._id++,
        name: this.name,
        transcript: this._getTranscript(),
      });
    }, 800);

    stream.on('data', () => null);

    stream.on('finish', () => {
      console.log('finish');
      clearInterval(transcriptInterval);
    });

    return this;
  }

  override async stop() {
    console.log(this.name + ':STOPPED!');
  }
}

export default InMemProvider;
