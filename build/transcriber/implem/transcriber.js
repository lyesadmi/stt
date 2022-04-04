import { EventEmitter } from 'events';
import EventsProviders from '../../providers/domain/events';
class Transcriber extends EventEmitter {
    constructor({ eventsNames, providers }) {
        super();
        this._props = [];
        this._stop = false;
        this._eventsNames = eventsNames;
        if (providers.length > 0) {
            providers.forEach((p) => this.add(p));
        }
    }
    _genericEventHandler(eventName) {
        return (...args) => {
            if (this._stop) {
                console.log('skipped', args);
                return;
            }
            this.emit(eventName, ...args);
        };
    }
    _subscribe(provider) {
        for (const eventName in this._eventsNames) {
            provider.on(eventName, this._genericEventHandler(eventName));
        }
    }
    add(provider) {
        this._subscribe(provider);
        console.log(provider.eventNames());
        this._props.push(provider);
        return this;
    }
    transcribe(stream) {
        this._props.forEach((provider) => {
            provider.process(stream);
        });
        return this;
    }
    stop() {
        this._stop = true;
        this._props.map((provider) => provider.stop());
    }
    static make(providers) {
        return new Transcriber({
            eventsNames: Object.values(EventsProviders),
            providers,
        });
    }
}
export default Transcriber;
