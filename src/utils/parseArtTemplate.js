import { getCssfromSass } from './parseStyles';

export const parseArttemplate = async (fileEntry, storeObj, needRefresh) => {
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
	let styleRoot = totalComponents?.['index.scss'];
	let cssFile = await getCssfromSass(styleRoot);
	let scriptStr = totalComponents?.['index.js'];
	let htmlStr = totalComponents?.['index.html'];
	let curFrame = document.createElement('iframe');
	curFrame.setAttribute('id', 'frameLive');
	curFrame.setAttribute('width', '100%');
	curFrame.setAttribute('height', '100%');
	curFrame.setAttribute('style', 'border:0px');
	// todo:支持.art编译
	curFrame.setAttribute(
		'srcdoc',
		`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>arttemplate with tailwind preview page</title>
	<link rel='stylesheet' href='https://all.franxxdaryl.site/assets/compiler-lib/tailwind.min.css'></link>
    <style>${cssFile}</style>
</head>
<body>
<script>
window.console=window.parent.console;
</script>
<script src="https://all.franxxdaryl.site/assets/compiler-lib/arttemplate-umd.js"></script>
${htmlStr}
        <script type="text/javascript">
            ${scriptStr}
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
