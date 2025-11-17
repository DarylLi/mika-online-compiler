let curVueApp = null;
export const parseAngular = (fileEntry, storeObj, needRefresh) => {
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
	let extraJs = Object.values(totalComponents);
	// 除去3个初始文件
	extraJs.splice(0, 3);
	let scriptList = [
		'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular.min.js',
		'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-animate.js',
		'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-aria.js',
		'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-messages.min.js',
		'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-material.min.js'
	];
	let curFrame = document.createElement('iframe');
	curFrame.setAttribute('id', 'angularLive');
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
    <title>angular preview page</title>
    <link rel="stylesheet" href='https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-material.min.css'>
    <style>${styleRoot}</style>
</head>
<body>
   ${AppCmpt}
    <!-- 引入 AngularJS CDN -->
    ${scriptList.map((link) => `<script src="${link}"></script>`).join('')}
    <script>window.console=window.parent.console;${scriptRoot}${extraJs.map((content) => `${content}`).join('')}</script>
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
