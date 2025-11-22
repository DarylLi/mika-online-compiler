export const parseSvelte = (fileEntry, storeObj, needRefresh) => {
	const AppCmpt = fileEntry;
	const totalComponents = {
		'index.html': AppCmpt
	};
	(storeObj?.[0]?.children || []).forEach((file) => {
		if (!/index.html/.test(file.filename)) {
			totalComponents[`${file.filename}`] = file.value;
		}
	});
	const scriptRoot = totalComponents?.['index.js'];
	const styleRoot = totalComponents?.['index.css'];
	let scriptStr = totalComponents?.['index.js'];
	let htmlStr = totalComponents?.['index.html'];
	let extraJs = Object.values(totalComponents);
	// 除去3个初始文件
	extraJs.splice(0, 3);
	let scriptList = [];
	let curFrame = document.createElement('iframe');
	curFrame.setAttribute('id', 'frameLive');
	curFrame.setAttribute('width', '100%');
	curFrame.setAttribute('height', '100%');
	curFrame.setAttribute('style', 'border:0px');
	curFrame.setAttribute(
		'srcdoc',
		`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>svelte preview page</title>
    <style>${styleRoot}</style>
</head>
<body>
    <!-- 引入svelte mjs CDN -->
    ${[].map((link) => `<script type="module"></script>`).join('')}
    <div class='rootFile'>
        <div class="app">
            <codepen-svelte></codepen-svelte>
        </div>
    </div>
    <script type="module">
    import * as svelte from "https://cdn.skypack.dev/svelte@3.46.2/compiler";
    window.console=window.parent.console;
    let reCompileDom = document.createElement('div');
    let scriptDom = document.createElement('script');
    let mainDome = document.createElement('div');
    mainDome.setAttribute('class','svelte-root');
    mainDome.innerHTML=\`${htmlStr}\`;
    scriptDom.innerHTML=\`${scriptStr}\`;
    reCompileDom.appendChild(mainDome);
    reCompileDom.appendChild(scriptDom);
    console.log(reCompileDom);
    const eleSource = reCompileDom; //document.querySelector(".source");
    // const eleInfo = document.querySelector('.info');
    const app = document.querySelector('.app');
    let removed = '';
    const compileOptions = {
        customElement: false,
        dev: false,
        format: 'esm'
    };
    function compile() {
        const { js, warnings } = svelte.compile(eleSource.innerHTML, compileOptions);
        // eleJs.value =
        let compiledCode = hack(js.code);
        app.innerHTML = '';
        try {
            let scp = document.createElement('script');
            scp.setAttribute('type', 'module');
            scp.innerHTML = \`import {
                    HtmlTag,
                    SvelteComponent,
                    append,
                    append_styles,
                    attr,
                    destroy_each,
                    detach,
                    element,
                    init,
                    insert,
                    listen,
                    noop,
                    safe_not_equal,
                    set_data,
                    set_input_value,
                    set_style,
                    space,
                    text
                } from "https://cdn.skypack.dev/svelte@3.46.2/internal";
                \${compiledCode\}\`;
            document.body.appendChild(scp);
            // eval(compiledCode);
        } catch (e) {
            console.log(
                'Maybe some features are missing, try do change the pen JS import of Svelte code',
                removed
            );
        }
    }
    function hack(code) {
        const remove = '"svelte/internal";';
        removed = code.substr(0, code.indexOf(remove) + remove.length);
        removed = removed.replace(
            'svelte/internal',
            'https://cdn.skypack.dev/svelte@3.46.2/internal'
        );
        console.log(
            'if it does not run, you have added code which requre the import to be updated to:'
        );

        let hacked = code
            .substr(code.indexOf(remove) + remove.length, code.length)
            .replace('export default Component;', '');
        hacked += \`const app = new Component({target: document.querySelector('.app')});\`;
        return hacked;
    }
    compile();
    </script>
    </body>
    </html>`
	);
	document.getElementById('previewFrame').innerHTML = '';
	document.getElementById('previewFrame').appendChild(curFrame);
	try {
	} catch (e) {
		console.log(e);
	}
};
