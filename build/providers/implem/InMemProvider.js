// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import paragraph from '@fakerjs/paragraph';
import Provider from '../domain/Provider';
import EventsProvider from '../domain/events';
class InMemProvider extends Provider {
    constructor() {
        super(...arguments);
        this._id = 0;
    }
    _getTranscript() {
        return paragraph({ sentences: 1, wordsMin: 5, wordsMax: 10 });
    }
    process(stream) {
        const transcriptInterval = setInterval(() => {
            this.emit(EventsProvider.TRANSCRIPT_RAW_EVENT, {
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
    async stop() {
        console.log(this.name + ':STOPPED!');
    }
}
export default InMemProvider;
