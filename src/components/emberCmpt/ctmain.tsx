import React, { useState, useEffect, useRef, useMemo } from 'react';
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from '@monaco-editor/react';
import { editStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { getCodeTransform, getFileContent, doDebounce } from '@utils/index';
import { parseEmber } from '@utils/parseEmber';
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
			prettierVal = await prettier.format(
				ngLanguage === 'html'
					? newValue
							// 临时处理<script type="text/x-handlebars"> prettier不支持格式化问题
							.split(/<script.*text\/x-handlebars.*>/)
							.join('<slot type="replace">')
							.replace(/script>/g, 'slot>')
					: newValue,
				{
					// ember page language inject
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
				}
			);
			editStore.updateCode(' ');
			setTimeout(() => {
				editStore.replaceFileContent(
					ngLanguage === 'html'
						? // 临时处理<script type="text/x-handlebars"> prettier不支持格式化问题
							prettierVal
								.replace(
									/<slot type="replace">/g,
									`<script type='text/x-handlebars'>`
								)
								.replace(/slot>/g, 'script>')
						: prettierVal
				);
				editStore.updateCode(
					ngLanguage === 'html'
						? prettierVal
								.replace(
									/<slot type="replace">/g,
									`<script type='text/x-handlebars'>`
								)
								.replace(/slot>/g, 'script>')
						: prettierVal
				);
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
			// ember page entry inject
			'src/index.html'
		);
		// 重新编译入口文件
		// ember parse entry inject
		parseEmber(
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
			// ember db template inject
			'mika-ember-templates',
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
						// ember language inject
						ngLanguage === 'html' ? 'markdown' : ngLanguage
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
