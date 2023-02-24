import navConfig from './nav.config'; // 引入 "组件" 导航的子路由配置
// examples/route.config.js
const LOAD_MAP = { // 便于切换不同语言的文件
    'zh-CN': name => {
        return r => require.ensure([], () =>
            r(require(`./pages/zh-CN/${name}.vue`)),
            'zh-CN');
    },
};
// 加载不同语言的路由
const load = function (lang, path) {
    return LOAD_MAP[lang](path);
};

const generateMiscRoutes = function (lang) {
    let guideRoute = {
        path: `/${ lang }/guide`, // 指南
        redirect: `/${ lang }/guide/design`,
        component: load(lang, 'guide'),
        children: [{
            path: 'design', // 设计原则
            name: 'guide-design' + lang,
            meta: {
                lang
            },
            component: load(lang, 'design')
        }, {
            path: 'nav', // 导航
            name: 'guide-nav' + lang,
            meta: {
                lang
            },
            component: load(lang, 'nav')
        }]
    };

    let themeRoute = {
        path: `/${ lang }/theme`,
        component: load(lang, 'theme-nav'),
        children: [{
                path: '/', // 主题管理
                name: 'theme' + lang,
                meta: {
                    lang
                },
                component: load(lang, 'theme')
            },
            {
                path: 'preview', // 主题预览编辑
                name: 'theme-preview-' + lang,
                meta: {
                    lang
                },
                component: load(lang, 'theme-preview')
            }
        ]
    };

    let resourceRoute = {
        path: `/${ lang }/resource`, // 资源
        meta: {
            lang
        },
        name: 'resource' + lang,
        component: load(lang, 'resource')
    };

    return [guideRoute, resourceRoute, themeRoute];
};

let route = [];
route = generateMiscRoutes('zh-CN');

// 增加 "组件" 路由的子路由
const LOAD_DOCS_MAP = {
    'zh-CN': path => {
        return r => require.ensure([], () =>
            r(require(`./docs/zh-CN${path}.md`)),
            'zh-CN');
    },
};
const loadDocs = function (lang, path) {
    return LOAD_DOCS_MAP[lang](path);
};
const registerRoute = (navConfig) => {
    let route = [];
    Object.keys(navConfig).forEach((lang, index) => {
        let navs = navConfig[lang];
        route.push({
            path: `/${ lang }/component`,
            // redirect: `/${ lang }/component/installation`,
            component: load(lang, 'component'),
            children: []
        });
        navs.forEach(nav => {
            if (nav.href) return;
            if (nav.groups) {
                nav.groups.forEach(group => {
                    group.list.forEach(nav => {
                        addRoute(nav, lang, index);
                    });
                });
            } else if (nav.children) {
                nav.children.forEach(nav => {
                    addRoute(nav, lang, index);
                });
            } else {
                addRoute(nav, lang, index);
            }
        });
    });

    function addRoute(page, lang, index) {
        const component = page.path === '/changelog' ? load(lang, 'changelog') : loadDocs(lang, page.path);
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description,
                lang
            },
            name: 'component-' + lang + (page.title || page.name),
            component: component.default || component
        };
        route[index].children.push(child);
    }
    return route;
};
let componentChilds = registerRoute(navConfig);
route = route.concat(componentChilds);

export default route;