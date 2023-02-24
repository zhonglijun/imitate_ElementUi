const mdContainer = require('markdown-it-container');
module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      // 匹配 markdown 中含有 :::demo  ::: 形式的块容器
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      // tokens 是通过解析 markdown 后输出的一个 数组对象, 具体形式可以自行打印查看
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        /**
         * description: 会获取到块容器中的 "描述信息" 的内容
         * 		:::demo 描述信息
         *
         *              :::
         *
         * content: 会获取到块容器中的 "html" 的内容
         *          :::demo 描述信息
         * 		```html
         *
         * 		```
         *          :::
         * 注意content被我们用 <!--element-demo: :element-demo--> 标签包裹起来了, 
         * 这主要是为我们后面操作html其中的内容提供一个标识作用
         */
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        // 把 :::demo ...  ::: 替换成 <demo-block> ... </demo-block> 标签
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `;
      }
      return '</demo-block>';
    }
  });
};