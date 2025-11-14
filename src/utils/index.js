import React, { useRef, useEffect, useState } from 'react';
import { transform, registerPlugin } from '@babel/standalone';
import { templates } from '@mock/fileData';

window.useState = useState;
window.useEffect = useEffect;
var transferMap = new Map();
let replaceMaps = new Map();
let mapSolute = new Map();

const matchFileName = (fileTrees = [], name) => {
	let result = null;
	//   匹配目录名称相符的第一个文件
	result = (fileTrees || []).find((e) => name.includes(e.filename));
	if (result) return result;
	(fileTrees || []).forEach((tree) => {
		result = tree.children ? matchFileName(tree.children, name) : null;
		if (result) return result;
	});
	return result;
};
// import内容替换
const doCheckImport = (str, nameprefix, checkedFile = templates) => {
	let result = str;
	transform(result, {
		presets: ['env'],
		plugins: [['transform-react-jsx'], ['confound', { prefix: nameprefix }]]
	}).code;
	// 文件import 检索
	let resultArr = [...result.matchAll(/import.*from.*.;/g)];
	// 替换import内容为相应代码段
	resultArr.length > 0 &&
		resultArr.forEach((mr, index) => {
			let matchedName = matchFileName(checkedFile, mr[0]);
			// 若引用文件存在则替换文件内容
			if (matchedName) {
				let fileInfo = matchedName;
				// 引用代码文件输出内容名称混淆处理
				let extraFile = fileInfo.value;

				// 对代码段内容进行同等替换检索
				let replaceCode = doCheckImport(
					extraFile,
					`${nameprefix}${fileInfo.filename.split('.')[0]}_`,
					checkedFile
				);
				// 引用文件相应对象变量名替换
				let importTarget = mr[0].replace('import', '').split('from')[0].trim();
				// 混淆引用名，防止单输出文件重名引用
				let replaceExportTarget = transferMap.get(importTarget) || importTarget;

				// 源文件export变量名
				const orginExportNameArr = replaceCode.split('export default');
				replaceCode =
					orginExportNameArr[1]?.trim() === replaceExportTarget
						? replaceCode.replace('export default', `//export default`)
						: replaceCode.replace(
								'export default',
								`var ${replaceExportTarget} =`
							);
				result = result.replace(
					mr[0],
					// import替换过就不替换了
					replaceMaps.get(importTarget) ? '' : replaceCode
				);
			}
			// 不存在则先注释处理
			else {
				result = result.replace(mr[0], `//${mr[0]}`);
			}
		});
	resultArr.forEach((mr) => {
		const curKey = `${mr[0].replace('import', '').split('from')[0].trim()}`;
		replaceMaps.set(curKey, `${nameprefix}${curKey}`);
		mapSolute.set(`${nameprefix}${curKey}`, { init: false });
		// return {[curKey]:`${nameprefix}${curKey}`}
	});
	try {
		const output = transform(result, {
			presets: ['env'],
			plugins: [['transform-react-jsx']]
		}).code;

		transform(output, {
			presets: ['env'],
			plugins: ['transFileConfound']
		}).code;
	} catch (error) {
		console.log(`引入文件变量名重复`);
	}
	return result;
};
// 名称混淆
function confound() {
	return {
		visitor: {
			ImportDefaultSpecifier(path, state) {
				const curName = `${state.opts.prefix}${path.node.local.name}`;
				transferMap.set(path.node.local.name, curName);
				path.node.local.name = curName;
			}
		}
	};
}
// 名称混淆赋值
function transConfound() {
	return {
		visitor: {
			Identifier(path) {
				path.node.name = transferMap.get(path.node.name) || path.node.name;
			}
		}
	};
}
// 引入文件名称混淆赋值
function transFileConfound() {
	return {
		visitor: {
			VariableDeclaration(path, state) {
				const curKey = path.node.declarations[0]?.id?.name;
				const curValue = path.node.declarations[0]?.init?.name;
				if (mapSolute.get(`${path.node.declarations[0]?.id?.name}`)) {
					mapSolute.set(`${path.node.declarations[0]?.id?.name}`, {
						targetKey: curValue,
						targetValue: curKey,
						replaceValue: `${curKey}_${curValue}`
					});
				}
			}
		}
	};
}
registerPlugin('confound', confound);
registerPlugin('transConfound', transConfound);
registerPlugin('transFileConfound', transFileConfound);

export const getCodeTransform = (codeTxt, checkedFiles, rewrite = false) => {
	const importCheckedCode = doCheckImport(codeTxt, 'index_', checkedFiles);
	// transform-react-jsx已处理部分名称替换，单文件需独自处理
	let values = Array.from(mapSolute.values());
	try {
		const duplicateList = values.filter(
			(e) =>
				e.targetKey &&
				values.map((w) => w.targetKey).filter((inner) => inner === e.targetKey)
					.length > 1
		);
		// console.log(duplicateList)
		if (duplicateList.length > 1) {
			let reCode = `let offList=[];let doDuplicateStr = importCheckedCode.replace(/${duplicateList[0].targetKey}.*()/g,(match,offset)=>{console.log('....',match,offset);match.includes('()')&&offList.push(match);console.log(offList.length);return 'D_'+offList.length+'_'+match});importCheckedCode=doDuplicateStr`;
			// console.log(reCode)
			eval(reCode);
			// let testCode = `let offList=[];let okStrArr = importCheckedCode.matchAll(/${duplicateList[0].targetKey}.*/g);console.log([...okStrArr])`;
			// eval(testCode)
		}
		const output = transform(importCheckedCode, {
			presets: ['env'],
			plugins: [['transform-react-jsx']]
		}).code;
		const afterCode = transform(output, {
			presets: ['env'],
			plugins: ['transConfound']
		}).code;
		rewrite
			? eval(
					`var exports={};const {${Object.keys(antd).join(',')}} = antd; const { useRef, useState, useEffect } = React;${afterCode};document.getElementById('previewFrame').shadowRoot.querySelector('body').innerHTML='';let targetRoot = document.createElement('div');targetRoot.setAttribute('id','previewContent');document.getElementById('previewFrame').shadowRoot.querySelector('body').appendChild(targetRoot);window._rootHandler = ReactDOM.createRoot(document.getElementById('previewFrame').shadowRoot.querySelector("#previewContent"));window._rootHandler.render(React.createElement(_default))`
				)
			: eval(
					`var exports={};const {${Object.keys(antd).join(',')}} = antd; const { useRef, useState, useEffect } = React;${afterCode};let targetRoot = document.createElement('div');targetRoot.setAttribute('id','previewContent');document.getElementById('previewFrame').shadowRoot.querySelector('body').appendChild(targetRoot);window._rootHandler = ReactDOM.createRoot(document.getElementById('previewFrame').shadowRoot.querySelector("#previewContent"));window._rootHandler.render(React.createElement(_default));`
				);
	} catch (error) {
		console.log(error);
	}
	transferMap = new Map();
	replaceMaps = new Map();
	mapSolute = new Map();
};

export const getFileContent = (files, path) => {
	let result = files.find((e) => e.path === path);
	if (result) return result.value;
	else {
		let innerFound = null;
		files.forEach((e) => {
			let inResult = e.children && getFileContent(e.children, path);

			if (inResult) innerFound = inResult;
		});
		return innerFound;
	}
};

export const replaceFileContent = (files, path, txt) => {
	let result = files.find((e) => e.path === path);
	if (result) result.value = txt;
	else {
		files.forEach((e) => {
			e.children && replaceFileContent(e.children, path, txt);
		});
	}
};

export const doDebounce = (fn, time) => {
	let timer = null;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, time);
	};
};
export default {
	getCodeTransform
};
