
# amp-html
### Full site AMP validator

If you publish your pages in AMP, you want to be sure any change does not affect your AMP performance. How? Setup a function generator that returns all URLS you want to validate and test them with the official Google's validator.

## Usage
```
// 1. Import module
const validator = require('amp-html');

// 2. Create your own url generator
const urlGenerator = function* (){
  for(let i=1; i < 200; i++){
    yield 'https://yourSite.com/page/'+i;
  }
}

// 3. Set the number of parallel jobs and validate!
async function run(){
  // This will fetch and validate 10 pages at the same time and 1 is id of request 
  const results = await validator(urlGenerator, 10, 1);
  console.log(results);
}
run();
```

### Another way to create a generator?
```
const urlGenerator = function* (){
  yield 'https://sitename.com/page/1/amp';
  yield 'https://sitename.com/page/2/amp';
  yield 'https://sitename.com/page/3/amp';
  yield 'https://sitename.com/page/4/amp';
  yield 'https://sitename.com/page/5/amp';
  yield 'https://sitename.com/page/6/amp';
}
```

### How to count correct and failed pages ?
```
console.log('Valid pages : ' + results.filter( result => result.status === 'PASS').length);
console.log('Invalid pages : ' + results.filter( result => result.status !== 'PASS').length);
console.log('Total: ' + results.length);
console.log('All results: ' + results);
```
