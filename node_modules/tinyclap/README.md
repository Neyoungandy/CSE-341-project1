# tinyclap - A tiny command line arguments parser for Node.js

```
npm install tinyclap
```

Example program :

```javascript
var clap = require('tinyclap')();
console.log(clap);
```

Input :

```
./index.js command
           -a
           -b42
           -c=88
           -d 21
           -ef
           -gh5
           -foo=bar
           --mn6
           --opt1 value1
           --opt2=value2
           --opt3="value with spaces"
           --long-option-with-dashes
           --long-option-with-value1=10
           --long-option-with-value2 20
           otherthing
```

Output :

```
{ node: '/usr/bin/node',
  file: '/home/john/index.js',
  cmd: 'command'
  argv:
   { '5': true,
     a: true,
     b: 42,
     c: '88',
     d: '21',
     e: true,
     f: true,
     g: true,
     h: true,
     foo: 'bar',
     mn6: true,
     opt1: 'value1',
     opt2: 'value2',
     opt3: 'value with spaces',
     'long-option-with-dashes': true,
     'long-option-with-value1': '10',
     'long-option-with-value2': '20' },
  argn:
   [ 'a',
     'b',
     'c',
     'd',
     'e',
     'f',
     'g',
     'h',
     '5',
     'foo',
     'mn6',
     'opt1',
     'opt2',
     'opt3',
     'long-option-with-dashes',
     'long-option-with-value1',
     'long-option-with-value2',
     'otherthing' ],
  }
```


# Contact

Alexandre Bintz <alexandre.bintz@gmail.com>  
Comments and suggestions are welcome.
