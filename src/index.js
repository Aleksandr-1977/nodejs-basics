import fs from 'node:fs';
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
