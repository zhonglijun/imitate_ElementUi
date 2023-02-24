import ElButton from './src/main.vue';

/* istanbul ignore next */
ElButton.install = function(Vue) {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;
