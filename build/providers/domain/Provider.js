import { EventEmitter } from 'events';
class Provider extends EventEmitter {
    constructor() {
        super();
        this.name = this.constructor.name;
    }
    process(_stream) {
        throw new Error('NotImplementedError: please implement process(stream)');
    }
    async stop() {
        throw new Error('NotImplementedError: please implement stop()');
    }
}
export default Provider;
