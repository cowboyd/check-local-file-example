import { main } from 'effection';
import { promises as fs } from 'fs';

main(function*() {
  let file = process.env.file || '';

  if (yield checkLocal(file)) {
    console.log(`file '${file}' exists`);
  } else {
    console.log(`file '${file}' does not exist`);
  }
})

function* checkLocal(filename) {
  try {
    yield fs.stat(filename);
  } catch (err) {
    if(err.code === 'ENOENT') { return false; }
  }
  return true;
}
