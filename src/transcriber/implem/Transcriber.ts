import type { ReadStream } from 'fs';
import type ITranscriber from '../domain/ITranscriber';
import type Provider from '../../providers/domain/Provider';

import { EventEmitter } from 'events';
import EventsProviders from '../../providers/domain/events';

type Dependencies = {
  eventsNames: typeof EventsProviders;
  providers: Provider[];
};

class Transcriber extends EventEmitter implements ITranscriber {
  private _props: Provider[] = [];
  private readonly _eventsNames: Dependencies['eventsNames'];
  private _stop = false;

  private constructor({ eventsNames, providers }: Dependencies) {
    super();
    this._eventsNames = eventsNames;
    if (providers.length > 0) {
      providers.forEach((p) => this.add(p));
    }
  }

  _genericEventHandler(eventName: string) {
    return (...args: any) => {
      if (this._stop) {
        console.log('skipped', args);
        return;
      }
      this.emit(eventName, ...args);
    };
  }

  _subscribe(provider: Provider) {
    this._eventsNames.forEach((eventName: string) =>
      provider.on(eventName, this._genericEventHandler(eventName)),
    );
  }

  add(provider: Provider): Transcriber {
    this._subscribe(provider);

    console.log(provider.eventNames());

    this._props.push(provider);

    return this;
  }

  transcribe(stream: ReadStream): Transcriber {
    this._props.forEach((provider) => {
      provider.process(stream);
    });

    return this;
  }

  stop() {
    this._stop = true;

    this._props.map((provider) => provider.stop());
  }

  static make(providers: Provider[]): ITranscriber {
    return new Transcriber({
      eventsNames: EventsProviders,
      providers,
    });
  }
}

export default Transcriber;
