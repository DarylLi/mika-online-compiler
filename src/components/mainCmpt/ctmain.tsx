import React, { useState, useEffect, useRef, useMemo } from 'react';
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from '@monaco-editor/react';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';
import { observer } from 'mobx-react-lite';
import { getCodeTransform, getFileContent, doDebounce } from '@utils/index';
import { parseVue } from '@utils/parseVue';
import { parseAngular } from '@utils/parseAngular';
import { updateData } from '@utils/indexDb';
import { toJS } from 'mobx';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserHtml from 'prettier/plugins/html';
import * as parserPostCSS from 'prettier/plugins/postcss';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import MonacoOptions from '@mock/monaco';
import { Button, Tooltip } from 'antd';
import { ToolOutlined } from '@ant-design/icons';

function MainEditor(props: any) {
	const { cpType = 'react' } = props;
	// let cursocket: any = null;
	const [code, setCode] = useState('');
	const cursocket: any = useRef(null);
	// const [cursocket, setCurSocket] = useState(null as any);
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
			// if (cpType !== 'vue' && cpType !== 'react') return;
			prettierVal = await prettier.format(newValue, {
				parser: !((editStore as any)?.fileInfo?.path || '').includes('scss')
					? cpType === 'vue'
						? cpType
						: cpType === 'react'
							? 'babel'
							: ngLanguage !== 'javascript'
								? ngLanguage
								: 'babel'
					: 'scss',
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
		// editStore.currentFiles,
		//   info?.node?.path,
		//   info?.node?.value
		// console.log(
		editStore.replaceFileContent(newValue);
		editStore.updateCode(newValue || ' ');
		// 更新入口文件
		let currentFile = getFileContent(
			editStore.currentFiles,
			cpType === 'react'
				? 'src/app.jsx'
				: cpType === 'vue'
					? 'src/App.vue'
					: 'src/index.html'
		);
		// 重新编译入口文件
		cpType === 'react'
			? getCodeTransform(currentFile || '', editStore.currentFiles, true)
			: cpType === 'vue'
				? parseVue(
						currentFile || '',
						JSON.parse(JSON.stringify(editStore.currentFiles))
					)
				: parseAngular(
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
			cpType === 'react'
				? 'mika-templates'
				: cpType === 'vue'
					? 'mika-vue-templates'
					: 'mika-ng-templates',
			changedData
		);
	};
	const options = {
		selectOnLineNumbers: true
	};
	useEffect(() => {
		socketStore.updatedCode && onChange(socketStore.updatedCode, null);
	}, [socketStore.updatedCode]);
	return (
		<div className="mika-mona-center-editor">
			<Tooltip placement="bottom" color="lime" title="formatting codes">
				<Button
					className="mika-mona-center-editor-format"
					shape="circle"
					icon={<ToolOutlined />}
					size="small"
					onClick={doFormat}
				></Button>
			</Tooltip>
			{editStore.code && (
				<MonacoEditor
					height="calc(100vh - 66px)"
					language={
						!((editStore as any)?.fileInfo?.path || '').includes('scss')
							? cpType === 'react'
								? 'javascript'
								: cpType === 'vue'
									? 'markdown'
									: ngLanguage
							: 'css'
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
