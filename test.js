// test.js
var render = require('json-templater/string');
var strs = `
姓名：{{name}}
年龄：{{age}}
爱好：{{hobby.coding}}、{{hobby.writing}}
其他：{{others}}
`;
var template = render(strs, {
  name: '橙某人',
  age: 18,
  hobby: {
    coding: '写代码',
    writing: '写文章',
  },
  others: ['var a = 1;', 'var b = 2;', 'var c = 3;'].join('\n') // 数组变字符串并加换行符
});
console.log(template)