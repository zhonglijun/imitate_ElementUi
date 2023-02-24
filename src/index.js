
import Button from '../packages/button/index.js';
import Input from '../packages/input/index.js';
const components = [
    Button,
  Input
];
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
export default {
  install,
    Button,
  Input
};
