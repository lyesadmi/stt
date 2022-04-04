import STT from './STT/implem';
const stt = new STT();
stt.on('normalizedTranscript', (normalizedTranscript) => {
    if (normalizedTranscript.id >= 5) {
        stt.stop();
    }
    console.log(normalizedTranscript);
});
stt.transcribe('./samples/my-audio.wav');
