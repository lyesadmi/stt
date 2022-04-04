import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1,
    min: 1,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function generateSentence(): string {
  return lorem.generateSentences();
}

export default generateSentence;
