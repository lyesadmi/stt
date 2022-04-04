import STT from './stt/implem';

const stt = new STT();

stt.on('normalizedTranscript', (normalizedTranscript: any) => {
  if (normalizedTranscript.id >= 5) {
    stt.stop();
  }
  console.log(normalizedTranscript);
});

stt.transcribe('./samples/tmp.wav');
