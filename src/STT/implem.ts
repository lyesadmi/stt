import makeSTT from './STT';
import TailReader from '../reader/implem/tail-reader';
import Transcriber from '../transcriber/implem/transcriber';
import VADProvider from '../providers/implem/vad';

export default makeSTT({
  reader: new TailReader(),
  transcriber: Transcriber.make([new VADProvider()]),
});
