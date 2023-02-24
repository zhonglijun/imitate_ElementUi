const Config = require('markdown-it-chain'); 
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence'); // 引入新文件

const config = new Config();

config
  .options.html(true).end()
  .plugin('containers').use(containers).end();

const md = config.toMd();

overWriteFenceRule(md); // 覆盖默认的 md 转 html 的渲染策略

module.exports = md;