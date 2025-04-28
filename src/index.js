import fs from 'node:fs/promises';
const message = 'Hello world';
function sum(a, b) {
  return a + b;
}
const result = sum(2, 5);
console.log(result);
console.log(message);

fs.readFile('text.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
fs.writeFile('write.txt', 'Hello,world!')
  .then(() => {
    console.log('File written successfully');
  })
  .catch((err) => {
    console.error('Error writing file', err);
  });
fs.appendFile('write.txt', 'Bye,world!\n')
  .then(() => {
    console.log('File appended successfully');
  })
  .catch((err) => {
    console.error('Error appending file', err);
  });
