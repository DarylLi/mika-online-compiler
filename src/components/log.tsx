import { observer } from 'mobx-react';
import React, { PureComponent, createRef } from 'react';
import { editStore } from '@store/index';
import { socketStore } from '@store/socket';
import { useConsole, getFileContent, getCodeTransform } from '@utils/index';
import { showVuePreview } from '@utils/parseVue';
import { Button, Tooltip, Popconfirm, Modal, Spin } from 'antd';
import { toJS } from 'mobx';
import {
	CodeOutlined,
	FileTextOutlined,
	PlayCircleOutlined,
	CommentOutlined,
	ContainerOutlined
} from '@ant-design/icons';
import '~@styles/index';

@observer
class EditLog extends PureComponent<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showLog: false,
			logPanelRef: null
		};
	}
	switchLog = () => {
		this.setState({ showLog: !this.state.showLog });
	};
	requestAssistance = () => {
		socketStore.requestAssistance(
			editStore.curType,
			JSON.stringify(editStore.currentFiles)
		);
	};
	getAssistanceList = () => {
		socketStore.getAssistanceList();
		console.log(toJS(socketStore.assitanceList));
		socketStore.switchList();
	};
	openPreview = () => {
		if (window.location.pathname === '/sfc') {
			let currentFile = getFileContent(editStore.currentFiles, 'src/App.vue');
			showVuePreview(
				currentFile,
				JSON.parse(JSON.stringify(editStore.currentFiles))
			);
			return;
		} else if (
			window.location.pathname === '/entry' ||
			window.location.pathname === '/'
		) {
			let currentFile = getFileContent(editStore.currentFiles, 'src/app.jsx');
			getCodeTransform(
				currentFile,
				JSON.parse(JSON.stringify(editStore.currentFiles)),
				false,
				true
			);
			return;
		}
		let shadowDomOrHTML =
			(
				(document as any).getElementById('angularLive') ||
				(document as any).getElementById('frameLive')
			)?.getAttribute('srcDoc') ||
			(document as any)
				.getElementById('previewFrame')
				.shadowRoot.querySelector('html');
		let newWindow = window.open('', '_blank', 'width=600,height=800');
		if (newWindow) {
			newWindow.document.write(shadowDomOrHTML.innerHTML || shadowDomOrHTML);
			newWindow.document.close();
		}
	};
	componentDidMount(): void {
		console.log(socketStore.SocketInstance);
		useConsole(toJS(editStore.logMsg), editStore);
		this.setState({ logPanelRef: createRef() }, () => {
			editStore.setLogPanelRef(this.state.logPanelRef);
		});
	}
	render() {
		const hideModal = () => {
			this.setState({ showLog: false });
		};
		const { showLog, logPanelRef } = this.state;
		const classNames = {
			header: 'mika-log-header',
			body: 'mika-log-body'
		};
		// const useStyle = createStyles(({ css }) => ({
		// 	root: css`
		// 		padding: 8px;
		// 	`
		// }));
		// const { styles } = useStyle();
		const sharedProps: any = {
			spinning: true,
			percent: 0
			// classNames: { root: styles.root }
		};
		return (
			<span className="logControl">
				{socketStore.socketPending && (
					<Spin {...sharedProps} className="socket-loading" />
				)}
				{socketStore?.needAssitance &&
					!socketStore.socketPending &&
					(socketStore.helperId ? (
						<span className="assistance-info">
							<span className="assistance-info-uid">
								{socketStore?.helperId}
							</span>
							is helping you.
						</span>
					) : (
						<span className="assistance-info">
							Your userId is ：
							<span className="assistance-info-uid">
								{socketStore?.SocketInstance?.userInfo?.uuid}
							</span>
							，please wait for someone to assist you.
						</span>
					))}
				{socketStore?.joinAssitance && !socketStore.socketPending && (
					<span className="assistance-info">
						You are helping ：
						<span className="assistance-info-uid">
							{socketStore?.assitantedId}
						</span>
					</span>
				)}
				{socketStore?.SocketInstance?.userInfo?.uuid &&
					!socketStore?.needAssitance &&
					!socketStore?.joinAssitance && (
						<span className="assistance-action-request">
							<Popconfirm
								title="Send Request"
								description="Sending an Encoding Assistance Request ?"
								onConfirm={this.requestAssistance}
							>
								<Tooltip
									placement="bottom"
									color="#334fff"
									title={'Need Assistance ~'}
								>
									<Button
										shape="circle"
										icon={<CommentOutlined />}
										size="large"
									></Button>
								</Tooltip>
							</Popconfirm>
						</span>
					)}
				{socketStore.SocketInstance?.userInfo?.uuid &&
					!socketStore?.needAssitance &&
					!socketStore?.joinAssitance && (
						<span className="assistance-action-list">
							<Tooltip
								placement="bottom"
								color="#41b883"
								title={'Assistance List'}
							>
								<Button
									onClick={this.getAssistanceList}
									shape="circle"
									icon={<ContainerOutlined />}
									size="large"
								></Button>
							</Tooltip>
						</span>
					)}
				<Tooltip
					placement="bottom"
					color="#e52a39"
					title={showLog ? 'hide console' : 'show console'}
				>
					<Button
						onClick={this.switchLog}
						shape="circle"
						icon={<CodeOutlined />}
						size="small"
					></Button>
				</Tooltip>
				<Tooltip placement="bottom" color="#ff3e00" title="open preview">
					<Button
						onClick={this.openPreview}
						shape="circle"
						icon={<PlayCircleOutlined />}
						size="small"
					></Button>
				</Tooltip>
				<Modal
					title="compile Logs"
					open={showLog}
					onOk={hideModal}
					onCancel={hideModal}
					classNames={classNames}
					footer={null}
					cancelText="close"
				>
					<div className="mika-out-log-content" ref={this.state.logPanelRef}>
						{editStore.logMsg.map((info, i) => (
							<span className="info-item" key={i}>
								<span>{info.msg}</span>
								<span>{info.time}</span>
							</span>
						))}
					</div>
				</Modal>
			</span>
		);
	}
}

export default EditLog;
