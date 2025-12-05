import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

function RightView(props: any) {
	const { cpType = 'react' } = props;
	// let cursocket: any = null;
	const [showView, setShowView] = useState(false);
	const frameRef: any = useRef(null);
	useEffect(() => {
		let shadowResult: HTMLElement | null =
			document.getElementById('previewFrame');
		if (cpType === 'angular') return;
		(shadowResult as any).attachShadow({ mode: 'open' });

		const htmlDom = document.createElement('html');
		const headDom = document.createElement('head');
		const bodyDom = document.createElement('body');
		const styleList =
			cpType === 'react'
				? [
						'https://all.franxxdaryl.site/assets/compiler-lib/reset.min.css',
						'https://all.franxxdaryl.site/assets/compiler-lib/antd.min.css'
					]
				: cpType === 'vue'
					? ['https://unpkg.com/element-plus@2.11.4/dist/index.css']
					: [
							'https://all.franxxdaryl.site/assets/compiler-lib/angular/angular-material.min.css'
						];
		for (var url of styleList) {
			axios.get(url).then((res) => {
				const style: any = document.createElement('style');
				// style.setAttribute("rel", "stylesheet");
				// style.setAttribute("href", url);
				style.setAttribute('type', 'text/css');
				// style tag注册放到外部html css中
				const outLine = res.data.match(/:root[\s\S]*?}/i)?.[0] || '';
				if (outLine) {
					let outHeadRoot = document.createElement('style');
					outHeadRoot.setAttribute('type', 'text/css');
					outHeadRoot.innerHTML = outLine;
					document.body.append(outHeadRoot);
				}
				// style.src = url;
				style.innerHTML = `${res.data}`;
				headDom.appendChild(style);
			});
		}
		htmlDom.appendChild(headDom);
		htmlDom.appendChild(bodyDom);
		(shadowResult as any).shadowRoot.appendChild(htmlDom);
		// https://cdn.jsdelivr.net/npm/antd@5.27.4/dist/reset.min.css
		// " rel="stylesheet">
		/* <link href="https://cdn.jsdelivr.net/npm/antd@4.16.13/dist/antd.min.css" rel="stylesheet"> */
	}, [frameRef]);

	return (
		<div
			className={`mika-mona-right-view ${cpType === 'angular' ? 'angularFrame' : ''}`}
			id="previewFrame"
			ref={frameRef}
		></div>
	);
}

export default observer(RightView);
