import React, { useState, useEffect } from 'react';
import { Input, Tree, message, Modal } from 'antd';
import { preactTemplates } from '@mock/preactData';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';
import { getCodeTransform, getFileContent } from '@utils/index';
import { parsePreact } from '@utils/parsePreact';
import {
	FolderFilled,
	DownOutlined,
	FileOutlined,
	CloseOutlined,
	EditOutlined,
	FileAddOutlined
} from '@ant-design/icons';
import {
	initIndexDB,
	getAllData,
	addData,
	updateData,
	getData
} from '@utils/indexDb';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
// const projcetTmp = { ...templates, ...crd, ...umiRust };

function Directory(props: any) {
	const [defaultFile, setDefaultFile] = useState({});
	// preact page path inject
	const [selectedKeys, setSelectedKeys] = useState([
		preactTemplates[0].children[0].path
	]);
	// editStore.setCurrentFile(currentFile);
	const [messageApi, contextHolder] = message.useMessage();
	const [newFile, setNewFile] = useState(null);
	const [showOP, setShowOP] = useState('');
	const [showRename, setShowRename] = useState('');
	const [showRenameKey, setShowRenameKey] = useState('');
	// const [spendKeys, setSpendKeys] = useState([editStore?.curType || "vue"]);
	// preact page template inject
	const [spendKeys, setSpendKeys] = useState([preactTemplates[0]?.path]);
	const onChange = (newValue: any, e: any) => {
		console.log('onChange', newValue, e);
	};

	const onExpand: any = (expandedKeys: any, expanded: boolean) => {
		setSpendKeys(expandedKeys);
	};
	const onRightClick = (info: any) => {
		setShowOP(info?.node?.path);
	};
	const inputName = (e: any) => {
		setShowRename(e.target.value);
	};
	const finishChangeName = (e: any) => {
		// 改名后：
		// 同步更新Store
		const templatesAfter = toJS(editStore.currentFiles);
		(templatesAfter[0].children || []).forEach((element: any) => {
			if (element.path === showRenameKey) {
				element.filename = showRename;
			}
		});
		// 同步更新indexDB缓存
		editStore.setCurrentFiles(templatesAfter);
		const changedData = {
			id: 'daryl',
			name: 'daryl',
			templates: toJS(templatesAfter)
		};
		updateData(
			(editStore as any).currentIndexDBInstance.db,
			// preact page db name inject
			'preact-ng-templates',
			changedData
		);
		// 重新编译
		const currentFile = templatesAfter[0].children.find((e: any) =>
			// preact page entry inject
			e.filename.includes('index.html')
		);
		// preact page parseMethod inject
		parsePreact(currentFile?.value || '', templatesAfter);
		setShowOP('');
		setShowRename('');
		setShowRenameKey('');
	};
	const AddFile = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		if (newFile) {
			return;
		}
		const templatesAfter = toJS(editStore.currentFiles);
		(templatesAfter[0].children || []).forEach((element: any) => {
			if (element.path === showRenameKey) {
				element.filename = showRename;
			}
		});

		const curFiles = templatesAfter[0].children;
		if (curFiles.length > 7) {
			messageApi.open({
				type: 'error',
				content: 'maxium file number reached ！！'
			});
			return;
		}
		let curFile = {
			// preact page new file inject
			filename: `newFile${curFiles.length}.js`,
			path: `src/newFile${curFiles.length}.js`,
			value: ` `
		};
		templatesAfter[0].children.push(curFile);
		// setNewFile();
		// 同步更新indexDB缓存
		editStore.setCurrentFiles(templatesAfter);
		const changedData = {
			id: 'daryl',
			name: 'daryl',
			templates: toJS(templatesAfter)
		};
		updateData(
			(editStore as any).currentIndexDBInstance.db,
			// preact page update db inject
			'mika-preact-templates',
			changedData
		);
	};
	const changeName = (event: any, node: any) => {
		event.preventDefault();
		event.stopPropagation();
		setShowRename(node?.filename);
		setShowRenameKey(node?.path);
	};
	const deleteData = (event: any, node: any) => {
		event.preventDefault();
		event.stopPropagation();
		Modal.confirm({
			title: 'Are you sure you want to delete this file?',
			onOk: () => {
				const templatesAfter = toJS(editStore.currentFiles);
				let curFiles = templatesAfter[0].children;
				curFiles = curFiles.filter((e: any) => e.path !== node.path);
				templatesAfter[0].children = curFiles;
				// 同步更新indexDB缓存
				editStore.setCurrentFiles(templatesAfter);
				const changedData = {
					id: 'daryl',
					name: 'daryl',
					templates: toJS(templatesAfter)
				};
				updateData(
					(editStore as any).currentIndexDBInstance.db,
					// preact page update db inject
					'mika-preact-templates',
					changedData
				);
				// 重新编译
				setSelectedKeys([
					// preact page update db inject
					preactTemplates[0].children[0].path
				]);
				const currentFile = templatesAfter[0].children.find((e: any) =>
					// preact page update db inject
					e.filename.includes('index.html')
				);
				// preact page parse method inject
				parsePreact(currentFile?.value || '', templatesAfter);
				onSelect([], {
					node: currentFile
				});
			}
		});
	};
	const onSelect = (selectedKeys: any[], info: any) => {
		if (!(window as any)._canSelectTree) return;
		info?.node?.kind !== 'directory' &&
			editStore.updateCode(
				getFileContent(editStore.currentFiles, info?.node?.path) || '',
				// preact page parse method inject
				info?.node?.path
			);
		info?.node?.kind !== 'directory' && editStore.updateInfo(info?.node || '');
		// getDBSaved({});
		setSpendKeys(
			spendKeys.includes(info?.node?.filename)
				? spendKeys.filter((e) => e !== info.node.filename)
				: [...spendKeys, info?.node?.filename]
		);
		setSelectedKeys([info?.node?.path]);
		setShowOP('');
		setShowRenameKey('');
	};
	useEffect(() => {
		const curData = {
			db: null,
			// preact page db init inject
			storeName: 'mika-preact-templates', //当前的数据库名
			version: 1 //版本号
		};
		const info = {
			id: 'daryl',
			name: 'daryl',
			templates:
				// preact page db init inject
				preactTemplates
		};

		setTimeout(async () => {
			const curRequest = await initIndexDB(curData);
			editStore.setCurrentFiles(
				// preact page entry init inject
				preactTemplates
			);
			editStore.setCurrentIndexDBInstance(curRequest);
			try {
				// indedb初始化
				let indexStore = await getData(
					curRequest.db,
					// preact page db init inject
					'mika-preact-templates',
					'daryl'
				);
				// 渲染文件树，及indexdb缓存生成
				indexStore?.templates
					? editStore.setCurrentFiles(indexStore.templates)
					: // preact page db init inject
						addData(curRequest.db, 'mika-preact-templates', info);
				// 默认文件加载
				const currentFile = (indexStore?.templates ||
					// preact page default file init inject
					preactTemplates)[0].children.find((e: any) =>
					// preact page default file init inject
					e.filename.includes('index.html')
				);
				// 默认文件store相关存储
				editStore.updateCode(
					currentFile.value,
					// preact page update file init inject
					'index.html'
				);
				editStore.updateInfo(currentFile);
				setDefaultFile(currentFile);
				// 渲染入口文件内容至目标dom
				const getRootDom = setInterval(() => {
					document.getElementById('previewFrame') &&
						(() => {
							// preact page update file init inject
							parsePreact(
								currentFile?.value || '',
								indexStore?.templates || preactTemplates
							);
							clearInterval(getRootDom);
						})();
				}, 500);
			} catch (error) {
				console.log(error);
			}
		});
	}, []);
	useEffect(() => {
		socketStore.switchFileNode.length > 0 &&
			onSelect([], {
				node: {
					path: socketStore.switchFileNode[0],
					filename: socketStore.switchFileNode[0]
				}
			});
		// setSelectedKeys(socketStore.switchFileNode);
	}, [socketStore.switchFileNode]);
	return (
		<div className="mika-mona-left-dir">
			{contextHolder}
			{editStore.currentFiles.length > 0 && (
				<Tree
					showLine={false}
					showIcon={true}
					icon={<FileOutlined />}
					switcherIcon={<DownOutlined />}
					onSelect={onSelect}
					onRightClick={onRightClick}
					selectedKeys={selectedKeys}
					onExpand={onExpand}
					expandedKeys={spendKeys}
					titleRender={(node: any) =>
						showRenameKey === node.path ? (
							<Input
								size="small"
								value={showRename}
								onClick={(e) => {
									e.stopPropagation();
								}}
								onFocus={(e) => {
									e.stopPropagation();
								}}
								onInput={(e) => {
									inputName(e);
								}}
								onBlur={finishChangeName}
							/>
						) : (
							<>
								<div className="mika-mona-left-dir-title">{node.filename}</div>
								{'src' === node.path && (
									<span
										className="mika-mona-left-dir-title-add"
										onClick={AddFile}
									>
										<FileAddOutlined />
									</span>
								)}
								{showOP === node.path &&
									!(
										/App.vue|app.jsx|index.html|index.js|index.css/.test(
											showOP
										) || showOP === 'src'
									) && (
										<div className="mika-mona-left-dir-title-op">
											<span>
												<EditOutlined
													onClick={(event) => {
														changeName(event, node);
													}}
												></EditOutlined>
											</span>
											<span>
												<CloseOutlined
													onClick={(event) => deleteData(event, node)}
												></CloseOutlined>
											</span>
										</div>
									)}
							</>
						)
					}
					treeData={(
						JSON.parse(JSON.stringify(editStore.currentFiles)) || []
					).map((el: any) => ({
						...el,
						icon: el.kind === 'directory' ? <FolderFilled /> : <FileOutlined />
					}))}
					fieldNames={{ title: 'filename', key: 'path' }}
				></Tree>
			)}
		</div>
	);
}

export default observer(Directory);
