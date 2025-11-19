import React, { useState, useEffect, useRef, useMemo } from 'react';
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from '@monaco-editor/react';
import { editStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { getCodeTransform, getFileContent, doDebounce } from '@utils/index';
import { parseSvelte } from '@utils/parseSvelte';
import { updateData } from '@utils/indexDb';
import { toJS } from 'mobx';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserHtml from 'prettier/plugins/html';
import * as parserPostCSS from 'prettier/plugins/postcss';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import MonacoOptions from '@mock/monaco';
import { Button } from 'antd';

function MainEditor(props: any) {
	const ngLanguage = useMemo(
		() =>
			/.*\.html$/.test(editStore.path)
				? 'html'
				: /.*\.js$/.test(editStore.path)
					? 'javascript'
					: 'css',
		[editStore.path]
	);
	const editorDidMount = (editor: any, monaco: any) => {
		// loadAngularConfig(monaco);
		editor.focus();
	};
	const doFormat = async () => {
		const newValue = editStore.code;
		let prettierVal: any = null;
		try {
			prettierVal = await prettier.format(newValue, {
				// svelte page language inject
				parser: ngLanguage !== 'javascript' ? ngLanguage : 'babel',
				plugins: [
					parserBabel,
					prettierPluginEstree as any,
					parserHtml,
					parserPostCSS
				],
				tabWidth: 4,
				useTabs: false,
				semi: true,
				singleQuote: true,
				trailingComma: 'none',
				bracketSpacing: true,
				arrowParens: 'always'
			});
			editStore.updateCode(' ');
			setTimeout(() => {
				editStore.replaceFileContent(prettierVal);
				editStore.updateCode(prettierVal);
			}, 200);
			// }
		} catch (err) {
			console.log(err);
			return;
		}
	};
	const onChange = async (newValue: any, e: any) => {
		editStore.replaceFileContent(newValue);
		editStore.updateCode(newValue || ' ');
		// 更新入口文件
		let currentFile = getFileContent(
			editStore.currentFiles,
			// svelte page entry inject
			'src/index.html'
		);
		// 重新编译入口文件
		// svelte parse entry inject
		parseSvelte(
			currentFile || '',
			JSON.parse(JSON.stringify(editStore.currentFiles)),
			true
		);
		const changedData = {
			id: 'daryl',
			name: 'daryl',
			templates: toJS(editStore.currentFiles)
		};
		updateData(
			(editStore as any).currentIndexDBInstance.db,
			// svelte db template inject
			'mika-svelte-templates',
			changedData
		);
	};
	const options = {
		selectOnLineNumbers: true
	};
	return (
		<div className="mika-mona-center-editor">
			<Button className="mika-mona-center-editor-format" onClick={doFormat}>
				formatting codes
			</Button>
			{editStore.code && (
				<MonacoEditor
					height="calc(100vh - 66px)"
					language={
						// svelte language inject
						ngLanguage
					}
					theme="vs-dark"
					value={editStore.code}
					options={MonacoOptions as any}
					loading={<div className="monac-load">编辑器加载中..</div>}
					onChange={doDebounce(onChange, 1000)}
					onMount={editorDidMount}
				></MonacoEditor>
			)}
		</div>
	);
}

export default observer(MainEditor);
