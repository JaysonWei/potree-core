import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = resolve('source/utils/binary-heap.d.ts');
const destination = resolve('dist/utils/binary-heap.d.ts');

await mkdir(dirname(destination), {recursive: true});
await cp(source, destination);
