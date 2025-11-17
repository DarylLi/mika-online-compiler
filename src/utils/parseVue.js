// import * as Vue from "vue";s
import vueRouter from 'vue-router';
import router from './vueRouter';

// const vuetify = Vuetify.createVuetify({
//   // ... your configuration
// });
let curVueApp = null;
export const parseVue = (fileEntry, storeObj) => {
	const AppCmpt = fileEntry;
	const totalComponents = {
		'App.vue': AppCmpt
	};
	(storeObj?.[0]?.children || []).forEach((file) => {
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
		getFile: (url) => {
			return Promise.resolve({ getContentData: () => totalComponents[url] });
		}
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

export const showVuePreview = (fileEntry, storeObj) => {
	const AppCmpt = fileEntry;
	const totalComponents = {
		'App.vue': AppCmpt
	};

	(storeObj?.[0]?.children || []).forEach((file) => {
		if (!/App.vue/.test(file.filename)) {
			totalComponents[`${file.filename}`] = file.value;
		}
	});
	let previewFrame = document.createElement('iframe');
	setTimeout(() => {
		previewFrame.setAttribute(
			'srcDoc',
			`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vue preview page</title>
	<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
	<script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.9.5/dist/vue3-sfc-loader.js"></script>
	<script src="https://all.franxxdaryl.site/assets/compiler-lib/vue.runtime.global.js"></script>
	<script src="//unpkg.com/element-plus"></script>
</head>
<body>
	<div id="previewBlank"></div>
</body>
	<script>const totalComponents = ${JSON.stringify(totalComponents).replaceAll('/script>', '|script>')};
	const options = {
		// devMode: true,
		moduleCache: { vue: Vue },
		addStyle(styleStr) {
			const style = document.createElement('style');
			style.textContent = styleStr;
			const ref =
				document.getElementsByTagName('style')?.[0] || null;
			document.getElementsByTagName('head')[0]
				.insertBefore(style, ref);
		},
		getFile: (url) => {
			return Promise.resolve({ getContentData: () => totalComponents[url].replaceAll('|script>', '/script>') });
		}
	};
	const initRoot = document.getElementById('previewBlank');
	rootApp = Vue.createApp(
		Vue.defineAsyncComponent(() =>
			window['vue3-sfc-loader'].loadModule('App.vue', options)
		)
	);
	curVueApp = rootApp;
	rootApp.use(ElementPlus).mount(initRoot);
	</script>`
		);
		let newWindow = window.open('', '_blank', 'width=600,height=800');
		if (newWindow) {
			newWindow.document.write(previewFrame.getAttribute('srcDoc'));
			newWindow.document.close();
			// 销毁iframe
			previewFrame = undefined;
		}
	}, 100);
};
