import type { ReadStream } from 'fs';
import { Throttle } from 'stream-throttle';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ts from 'tail-stream';

import type IReader from '../domain/IReader';

class TailReader implements IReader {
  read(filePath: string): ReadStream {
    const file = ts.createReadStream(filePath, {
      beginAt: 'end',
      waitForCreate: true,
    });

    return file.pipe(new Throttle({ rate: 10240 * 10 }));
  }
}

export default TailReader;
