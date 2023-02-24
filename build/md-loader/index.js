const {stripScript, stripTemplate, genInlineComponentText} = require('./util');
const md = require('./config');

module.exports = function(source) {
  const content = md.render(source); // 把 markdown 转换成 HTML

  // 一个 .md 文件转换后, 里面肯定会有很多个 <demo-block /> 我们需要把它们都逐个找出来做一些处理, 因此需要定义一些索引
  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = ''; // 以 'element-demoX': render() 形式存在的字符串
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd); // 获取到 <!--element-demo: :element-demo--> 标签包裹的内容
    const html = stripTemplate(commentContent); // 获取 <template></template> 标签的内容
    const script = stripScript(commentContent); // 获取 <script></script>标签的内容
    let demoComponentContent = genInlineComponentText(html, script); // 把 html 和 script 的内容变成vue中的一个 render 函数
    const demoComponentName = `element-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`); // 把每块 <demo-block />组件 变成 <element-demoX /> 组件
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一个 :::demo ::: 位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  let pageScript = ''; // 执行组件注册
  if (componenetsString) {
    // 如果存在 <demo-block />组件, 则把 'element-demoX': render() 形式的组件全部进行注册
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  }

  output.push(content.slice(start));

  return `
        <template>
          <section class="content element-doc">
             ${output.join('')}
          </section>
        </template>
        ${pageScript}
  `;
}