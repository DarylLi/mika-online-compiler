import { getCssfromSass } from './parseStyles';

export const parsePugtemplate = async (fileEntry, storeObj, needRefresh) => {
	const AppCmpt = fileEntry;
	const totalComponents = {
		'index.pug': AppCmpt
	};
	(storeObj?.[0]?.children || []).forEach((file) => {
		if (!/index.pug/.test(file.filename)) {
			totalComponents[`${file.filename}`] = file.value;
		}
	});
	const scriptRoot = totalComponents?.['index.js'];
	let styleRoot = totalComponents?.['index.scss'];
	let cssFile = await getCssfromSass(styleRoot);
	let scriptStr = totalComponents?.['index.js'];
	let pugString = totalComponents?.['index.pug'];
	let htmlStr = pug?.render?.(pugString) || '';
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
    <title>pug preview page</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'></link>
    <style>${cssFile}</style>
</head>
<body>
<script>
window.console=window.parent.console;
</script>
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
