import { Throttle } from 'stream-throttle';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ts from 'tail-stream';
class TailReader {
    read(filePath) {
        const file = ts.createReadStream(filePath);
        return file.pipe(new Throttle({ rate: 10240 * 5 }));
    }
}
export default TailReader;
