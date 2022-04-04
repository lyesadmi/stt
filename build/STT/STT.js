import { EventEmitter } from 'events';
import ProviderEvents from '../providers/domain/events';
function makeSTT({ reader, transcriber, }) {
    return class STT extends EventEmitter {
        constructor() {
            super();
            this._transcriber = transcriber;
            this._reader = reader;
            this._transcriber.on(ProviderEvents.TRANSCRIPT_RAW_EVENT, (transcript) => {
                this.emit('normalizedTranscript', transcript);
            });
        }
        transcribe(filePath) {
            const stream = this._reader.read(filePath);
            this._transcriber.transcribe(stream);
            return this;
        }
        stop() {
            this._transcriber.stop();
        }
    };
}
export default makeSTT;
