// import * as Vue from "vue";s
import vueRouter from 'vue-router';
import router from './vueRouter';

// const vuetify = Vuetify.createVuetify({
//   // ... your configuration
// });
let curVueApp = null;
export const parseVue = (fileEntry, storeObj, needRefresh) => {
  const AppCmpt = fileEntry;
  const totalComponents = {
    'App.vue': AppCmpt,
  };
  (storeObj?.[0]?.children || []).forEach(file => {
    if (!/App.vue/.test(file.filename)) {
      totalComponents[`${file.filename}`] = file.value;
    }
  });
  const options = {
    // devMode: true,
    moduleCache: { vue: Vue },
    addStyle(styleStr) {
      const style = document.createElement('style');
      style.textContent = styleStr;
      const ref =
        document
          .getElementById('previewFrame')
          .shadowRoot.querySelector('style') || null;
      // document.head.insertBefore(style, ref);
      document
        .getElementById('previewFrame')
        .shadowRoot.querySelector('head')
        .insertBefore(style, ref);
    },
    getFile: url => {
      return Promise.resolve({ getContentData: () => totalComponents[url] });
    },
  };

  let rootApp = null;
  document
    .getElementById('previewFrame')
    .shadowRoot.querySelector('body').innerHTML = '';
  const initRoot = document.createElement('div');
  initRoot.setAttribute('id', 'previewContent');
  document
    .getElementById('previewFrame')
    .shadowRoot.querySelector('body')
    .appendChild(initRoot);
  try {
    if (!curVueApp) {
      rootApp = Vue.createApp(
        Vue.defineAsyncComponent(() =>
          window['vue3-sfc-loader'].loadModule('App.vue', options)
        )
      );
      curVueApp = rootApp;
      rootApp
        .use(ElementPlus)
        .mount(
          document
            .getElementById('previewFrame')
            .shadowRoot.querySelector('#previewContent')
        );
      // rootApp.use(router)
      // mount(document.getElementById("previewFrame"));
    } else {
      curVueApp.unmount();
      rootApp = Vue.createApp(
        Vue.defineAsyncComponent(() =>
          window['vue3-sfc-loader'].loadModule('App.vue', options)
        )
      );
      curVueApp = rootApp;
      rootApp
        .use(ElementPlus)
        .mount(
          document
            .getElementById('previewFrame')
            .shadowRoot.querySelector('#previewContent')
        );
      // rootApp.use(router).mount(document.getElementById("previewFrame"));
    }
  } catch (e) {
    curVueApp.unmount();
    console.log(e);
  }
};
