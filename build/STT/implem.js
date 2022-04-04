import makeSTT from './STT';
import InMemProvider from '../providers/implem/InMemProvider';
import TailReader from '../reader/implem/tail-reader';
import Transcriber from '../transcriber/implem/transcriber';
export default makeSTT({
    reader: new TailReader(),
    transcriber: Transcriber.make([new InMemProvider()]),
});
