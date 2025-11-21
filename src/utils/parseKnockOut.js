export const parseKnockOut = (fileEntry, storeObj, needRefresh) => {
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
    <title>knock-out-js preview page</title>
    <style>${styleRoot}</style>
</head>
<body>
<script>
window.console=window.parent.console;
</script>
${htmlStr}
    <script type="text/javascript" src="https://knockoutjs.com/downloads/knockout-3.2.0.js"></script>
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
