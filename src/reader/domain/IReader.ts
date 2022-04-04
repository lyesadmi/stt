import type { ReadStream } from 'fs';

interface IReader {
  read(filePath: string): ReadStream;
}

export default IReader;
