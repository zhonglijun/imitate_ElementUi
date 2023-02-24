var fs = require('fs');
var path = require('path');
var Components = require('../../components.json'); // 引入组件的配置文件
Components = Object.keys(Components); // Components = ['button', 'divider', 'loading', 'alert']

/**文件类型:
 * 'theme-chalk': 表示自动生成的是 .scss 文件; 
 * 'theme-default': 表示自动生成的是 .css 文件.
 */
var themes = ['theme-chalk'];
// 绝对路径: 定位到你项目的packages目录下
var basepath = path.resolve(__dirname, '../../packages/');

// 一个判断文件是否存在的工具函数
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

// 重点: gen-cssfile.js文件执行, 只会跑这里的内容
themes.forEach((theme) => {
    var isSCSS = theme !== 'theme-default';
    // index.scss文件开头第一句默认引入base.scss文件, base.scss文件为图标或者动画样式
    var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';

    Components.forEach(function (key) {
        if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
        var fileName = key + (isSCSS ? '.scss' : '.css');
        // 组件在 index.scss 中引入
        indexContent += '@import "./' + fileName + '";\n';
        var filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            fs.writeFileSync(filePath, '', 'utf8');
            console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
        }
    });
    // 把 indexContent 内容写入 index.scss 中, 每次都进行覆盖
    fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});