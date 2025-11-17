import React, { useState, useEffect, useRef, useMemo } from 'react';
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from '@monaco-editor/react';
import { editStore } from '@store/index';
import { observer } from 'mobx-react-lite';
import { getCodeTransform, getFileContent, doDebounce } from '@utils/index';
import { parseVue } from '@utils/parseVue';
import { parseAngular } from '@utils/parseAngular';
import { updateData } from '@utils/indexDb';
import { toJS } from 'mobx';
import { loadAngularConfig } from '../config/monacoConfig';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserHtml from 'prettier/plugins/html';
import * as parserPostCSS from 'prettier/plugins/postcss';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import { Button } from 'antd';

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
				parser:
					cpType === 'vue'
						? cpType
						: cpType === 'react'
							? 'babel'
							: ngLanguage !== 'javascript'
								? ngLanguage
								: 'babel',
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
	const mdOption = {
		acceptSuggestionOnCommitCharacter: true,
		acceptSuggestionOnEnter: 'on',
		accessibilitySupport: 'auto',
		accessibilityPageSize: 10,
		ariaLabel: 'Editor content',
		ariaRequired: false,
		screenReaderAnnounceInlineSuggestion: true,
		autoClosingBrackets: 'languageDefined',
		autoClosingComments: 'languageDefined',
		autoClosingDelete: 'auto',
		autoClosingOvertype: 'auto',
		autoClosingQuotes: 'languageDefined',
		autoIndent: 'full',
		autoSurround: 'languageDefined',
		bracketPairColorization: {
			enabled: true,
			independentColorPoolPerBracketType: false
		},
		bracketPairGuides: {
			bracketPairs: false,
			bracketPairsHorizontal: 'active',
			highlightActiveBracketPair: true,
			indentation: true,
			highlightActiveIndentation: true
		},
		stickyTabStops: false,
		codeLens: true,
		codeLensFontFamily: '',
		codeLensFontSize: 0,
		colorDecorators: true,
		colorDecoratorActivatedOn: 'clickAndHover',
		colorDecoratorsLimit: 500,
		columnSelection: false,
		comments: {
			insertSpace: true,
			ignoreEmptyLines: true
		},
		contextmenu: true,
		copyWithSyntaxHighlighting: true,
		cursorBlinking: 'blink',
		cursorSmoothCaretAnimation: 'off',
		cursorStyle: 'line',
		cursorSurroundingLines: 0,
		cursorSurroundingLinesStyle: 'default',
		cursorWidth: 0,
		disableLayerHinting: false,
		disableMonospaceOptimizations: false,
		domReadOnly: false,
		dragAndDrop: true,
		emptySelectionClipboard: true,
		dropIntoEditor: {
			enabled: true,
			showDropSelector: 'afterDrop'
		},
		stickyScroll: {
			enabled: true,
			maxLineCount: 5,
			defaultModel: 'outlineModel',
			scrollWithEditor: true
		},
		experimentalWhitespaceRendering: 'svg',
		extraEditorClassName: '',
		fastScrollSensitivity: 5,
		find: {
			cursorMoveOnType: true,
			seedSearchStringFromSelection: 'always',
			autoFindInSelection: 'never',
			globalFindClipboard: false,
			addExtraSpaceOnTop: true,
			loop: true
		},
		fixedOverflowWidgets: false,
		folding: true,
		foldingStrategy: 'auto',
		foldingHighlight: true,
		foldingImportsByDefault: false,
		foldingMaximumRegions: 5000,
		unfoldOnClickAfterEndOfLine: false,
		fontFamily: "Menlo, Monaco, 'Courier New', monospace",
		fontLigatures2: false,
		fontSize: 12,
		fontWeight: 'normal',
		fontVariations: false,
		formatOnPaste: false,
		formatOnType: false,
		glyphMargin: true,
		gotoLocation: {
			multiple: null,
			multipleDefinitions: 'peek',
			multipleTypeDefinitions: 'peek',
			multipleDeclarations: 'peek',
			multipleImplementations: 'peek',
			multipleReferences: 'peek',
			alternativeDefinitionCommand: 'editor.action.goToReferences',
			alternativeTypeDefinitionCommand: 'editor.action.goToReferences',
			alternativeDeclarationCommand: 'editor.action.goToReferences',
			alternativeImplementationCommand: '',
			alternativeReferenceCommand: ''
		},
		hideCursorInOverviewRuler: false,
		hover: {
			enabled: true,
			delay: 300,
			sticky: true,
			hidingDelay: 300,
			above: true
		},
		inDiffEditor: false,
		letterSpacing: 0,
		lightbulb: {
			enabled: 'onCode'
		},
		lineDecorationsWidth: 10,
		lineHeight: 0,
		lineNumbers: 'on',
		lineNumbersMinChars: 5,
		linkedEditing: false,
		links: true,
		matchBrackets: 'always',
		minimap: {
			enabled: true,
			autohide: false,
			size: 'proportional',
			side: 'right',
			showSlider: 'mouseover',
			scale: 1,
			renderCharacters: true,
			maxColumn: 120,
			showRegionSectionHeaders: true,
			showMarkSectionHeaders: true,
			sectionHeaderFontSize: 9,
			sectionHeaderLetterSpacing: 1
		},
		mouseStyle: 'text',
		mouseWheelScrollSensitivity: 1,
		mouseWheelZoom: false,
		multiCursorMergeOverlapping: true,
		multiCursorModifier: 'alt',
		multiCursorPaste: 'spread',
		multiCursorLimit: 10000,
		occurrencesHighlight: 'singleFile',
		overviewRulerBorder: true,
		overviewRulerLanes: 2,
		padding: {
			top: 0,
			bottom: 0
		},
		pasteAs: {
			enabled: true,
			showPasteSelector: 'afterPaste'
		},
		parameterHints: {
			enabled: true,
			cycle: true
		},
		peekWidgetDefaultFocus: 'tree',
		definitionLinkOpensInPeek: false,
		quickSuggestions: {
			other: 'on',
			comments: 'off',
			strings: 'off'
		},
		quickSuggestionsDelay: 10,
		readOnly: false,
		renameOnType: false,
		renderControlCharacters: true,
		renderFinalNewline: 'on',
		renderLineHighlight: 'line',
		renderLineHighlightOnlyWhenFocus: false,
		renderValidationDecorations: 'editable',
		renderWhitespace: 'selection',
		revealHorizontalRightPadding: 15,
		roundedSelection: true,
		rulers: [],
		scrollbar: {
			vertical: 'auto',
			horizontal: 'auto',
			verticalScrollbarSize: 14,
			horizontalScrollbarSize: 12,
			scrollByPage: false,
			ignoreHorizontalScrollbarInContentHeight: false
		},
		scrollBeyondLastColumn: 4,
		scrollBeyondLastLine: true,
		scrollPredominantAxis: true,
		selectionClipboard: true,
		selectionHighlight: true,
		selectOnLineNumbers: true,
		showFoldingControls: 'mouseover',
		showUnused: true,
		showDeprecated: true,
		inlayHints: {
			enabled: 'on',
			fontSize: 0,
			fontFamily: '',
			padding: false
		},
		snippetSuggestions: 'inline',
		smartSelect: {
			selectLeadingAndTrailingWhitespace: true,
			selectSubwords: true
		},
		smoothScrolling: false,
		stopRenderingLineAfter: 10000,
		suggest: {
			insertMode: 'insert',
			filterGraceful: true,
			localityBonus: false,
			shareSuggestSelections: false,
			selectionMode: 'always',
			snippetsPreventQuickSuggestions: false,
			showIcons: true,
			showStatusBar: false,
			preview: false,
			showInlineDetails: true,
			maxVisibleSuggestions: 0,
			filteredTypes: {},
			showMethods: true,
			showFunctions: true,
			showConstructors: true,
			showDeprecated: true,
			matchOnWordStartOnly: true,
			showFields: true,
			showVariables: true,
			showClasses: true,
			showStructs: true,
			showInterfaces: true,
			showModules: true,
			showProperties: true,
			showEvents: true,
			showOperators: true,
			showUnits: true,
			showValues: true,
			showConstants: true,
			showEnums: true,
			showEnumMembers: true,
			showKeywords: true,
			showWords: true,
			showColors: true,
			showFiles: true,
			showReferences: true,
			showCustomcolors: true,
			showFolders: true,
			showTypeParameters: true,
			showSnippets: true,
			showUsers: true,
			showIssues: true
		},
		inlineSuggest: {
			enabled: true,
			showToolbar: 'onHover',
			suppressSuggestions: false,
			fontFamily: 'default'
		},
		inlineEdit: {
			enabled: false,
			showToolbar: 'onHover',
			fontFamily: 'default'
		},
		inlineCompletionsAccessibilityVerbose: false,
		suggestFontSize: 0,
		suggestLineHeight: 0,
		suggestOnTriggerCharacters: true,
		suggestSelection: 'first',
		tabCompletion: 'off',
		tabIndex: 0,
		unicodeHighlight: {
			nonBasicASCII: 'inUntrustedWorkspace',
			invisibleCharacters: true,
			ambiguousCharacters: true,
			includeComments: 'inUntrustedWorkspace',
			includeStrings: true,
			allowedCharacters: {},
			allowedLocales: {
				_os: true,
				_vscode: true
			}
		},
		unusualLineTerminators: 'prompt',
		useShadowDOM: true,
		useTabStops: true,
		wordBreak: 'normal',
		wordSegmenterLocales: [],
		wordSeparators: '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?',
		wordWrap: 'off',
		wordWrapBreakAfterCharacters:
			' \t})]?|/&.,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ”〉》」』】〕）］｝｣',
		wordWrapBreakBeforeCharacters: '([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋',
		wordWrapColumn: 80,
		wordWrapOverride1: 'inherit',
		wordWrapOverride2: 'inherit',
		defaultColorDecorators: false,
		tabFocusMode: false,
		wrappingIndent: {
			wrappingIndent: 'same'
		},
		wrappingStrategy: {
			wrappingStrategy: 'simple'
		}
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
						cpType === 'react'
							? 'javascript'
							: cpType === 'vue'
								? 'markdown'
								: ngLanguage
					}
					theme="vs-dark"
					value={editStore.code}
					options={mdOption as any}
					loading={<div className="monac-load">编辑器加载中..</div>}
					onChange={doDebounce(onChange, 1000)}
					onMount={editorDidMount}
				></MonacoEditor>
			)}
		</div>
	);
}

export default observer(MainEditor);
