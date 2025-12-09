import { getCssfromSass } from './parseStyles';

export const parseBackBone = async (fileEntry, storeObj, needRefresh) => {
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
	curFrame.setAttribute(
		'srcdoc',
		`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>backbone preview page</title>
    <style>${cssFile}</style>
</head>
<body>
<script>
window.console=window.parent.console;
</script>
${htmlStr}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js" integrity="sha512-jGR1T3dQerLCSm/IGEGbndPwzszJBlKQ5Br9vuB0Pw2iyxOy+7AK+lJcCC8eaXyz/9du+bkCy4HXxByhxkHf+w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
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
