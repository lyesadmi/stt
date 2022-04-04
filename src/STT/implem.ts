import makeSTT from './STT';
import TailReader from '../reader/implem/TailReader';
import Transcriber from '../transcriber/implem/Transcriber';
import VADProvider from '../providers/implem/vad';

export default makeSTT({
  reader: new TailReader(),
  transcriber: Transcriber.make([new VADProvider()]),
});
